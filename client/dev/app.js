// Holds anything kiwi client specific (ie. front, gateway, kiwi.plugs..)
/**
*   @namespace
*/
var kiwi = {};

kiwi.model = {};
kiwi.view = {};
kiwi.applets = {};


/**
 * A global container for third party access
 * Will be used to access a limited subset of kiwi functionality
 * and data (think: plugins)
 */
kiwi.global = {
	utils: undefined, // Re-usable methods
	gateway: undefined,
	user: undefined,
	server: undefined,
	command: undefined,  // The control box

	settings: {
		'quit_message': 'http://KiwiIRC.com - The web based IRC client',
		'part_message': '',

		'alert_on': ['highlight', 'query', 'active_channel_message', 'channel_message'],

		'theme': 'default'
	},

	// TODO: think of a better term for this as it will also refer to queries
	channels: (function () {
		var channels = function (name, fn) {
			var chans = [];

			// If only a callback function has been set, set a blank name
			if (typeof name === 'function') {
				fn = name;
				name = null;
			}

			// Get 1 channel only
			if (typeof name === 'string') {
				chans.push(kiwi.app.panels.getByName(name));

			} else if (typeof name === 'object' && name) {
				// Find each of the specified channels
				_.each(name, function (name) {
					var tmp = kiwi.app.panels.getByName(name);
					if (tmp && tmp.isChannel()) chans.push(tmp);
				});
			} else {
				// Otherwise.. just get them all
				_.each(kiwi.app.panels.models, function (panel) {
					if (panel && panel.isChannel()) chans.push(panel);
				});
			}

			// If a callback function has been set, call it with each channel
			if (typeof fn === 'function') {
				_.each(chans, fn);
			}

			return chans;
		};


		channels.join = function (chans) { kiwi.gateway.join(chans); };

		// TODO: Add knock support to gateway
		//channels.knock = function (chan) { kiwi.gateway.knock(chan); };

		return channels;
	})(),

	// Entry point to start the kiwi application
	start: function (opts) {
		opts = opts || {};

		kiwi.app = new kiwi.model.Application(opts);

		if (opts.kiwi_server) {
			kiwi.app.kiwi_server = opts.kiwi_server;
		}

		kiwi.app.start();

		return true;
	}
};



// If within a closure, expose the kiwi globals
if (typeof global !== 'undefined') {
	global.kiwi = kiwi.global;
}