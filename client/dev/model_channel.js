// TODO: Channel modes
// TODO: Listen to gateway events for anythign related to this channel
kiwi.model.Channel = kiwi.model.Panel.extend({
    initialize: function (attributes) {
        var name = this.get("name") || "",
            members;

        this.view = new kiwi.view.Channel({"model": this, "name": name});
        this.set({
            "members": new kiwi.model.MemberList(),
            "name": name,
            "scrollback": [],
            "topic": ""
        }, {"silent": true});

        members = this.get("members");
        members.bind("add", function (member) {
            this.addMsg(' ', '== ' + member.displayNick(true) + ' has joined', 'action join');
        }, this);

        members.bind("remove", function (member, members, options) {
            var msg = (options.message) ? '(' + options.message + ')' : '';

            if (options.type === 'quit') {
                this.addMsg(' ', '== ' + member.displayNick(true) + ' has quit ' + msg, 'action quit');
            } else if(options.type === 'kick') {
                this.addMsg(' ', '== ' + member.displayNick(true) + ' was kicked by ' + options.by + ' ' + msg, 'action kick');
            } else {
                this.addMsg(' ', '== ' + member.displayNick(true) + ' has left ' + msg, 'action part');
            }
        }, this);
    },



    /**
     * Helper methods
     */
    say: function (msg) {
        kiwi.app.controlbox.processInput('/msg ' + this.get('name') + ' ' + msg);
    },

    action: function (msg) {
        kiwi.gateway.action(this.get('name'), msg);
    },

    users: function (nick, fn) {
            var users = [],
                members = this.get('members');

            // if we don't have any users.. nothing to do
            if (!members || members.models.length === 0) {
                return users;
            }

            // If only a callback function has been set, set a blank name
            if (typeof nick === 'function') {
                fn = nick;
                nick = null;
            }

            // Get 1 user only
            if (typeof nick === 'string') {
                users.push(members.getByNick(nick));

            } else if (typeof nick === 'object' && nick) {
                // Find each of the specified users
                _.each(nick, function (nick) {
                    var tmp = members.getByNick(nick);
                    if (tmp) users.push(tmp);
                });
            } else {
                // Otherwise.. just get them all
                _.each(members.models, function (member) {
                    if (member) users.push(member);
                });
            }

            // If a callback function has been set, call it with each channel
            if (typeof fn === 'function') {
                _.each(users, fn);
            }

            return users;
    }
});