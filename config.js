var conf = {};

// Run the Kiwi server under a different user/group
conf.user = "";
conf.group = "";


// Log file location
conf.log = "kiwi.log";



/*
 * Server listen blocks
 */

// Do not edit this line!
conf.servers = [];

// Example server block
conf.servers.push({
    port:   7778,
    address: "0.0.0.0"
});

// Example SSL server block
//conf.servers.push({
//    port:     7777,
//    address: "0.0.0.0",
//
//    ssl:   true,
//    ssl_key: "server.key",
//    ssl_cert: "cert.pem"
//});






// Where the client files are
conf.public_http = "client/";

// Max connections per connection. 0 to disable
conf.max_client_conns = 5;

// Enabled CAP extensions (See ENTER URL TO CAP INFO HERE PLS)
conf.cap_options = [];




// Directory to find the server modules
conf.module_dir = "./kiwi_modules/";

// Which modules to load
conf.modules = ["spamfilter", "statistics"];




// WebIRC passwords enabled for this server
conf.webirc_pass = {
    //"irc.network.com":  "configured_webirc_password",
    //"127.0.0.1":        "foobar"
};

// Some IRCDs require the clients IP via the username/ident
conf.ip_as_username = [
	"irc.network.com",
	"127.0.0.1"
];

// Whether to verify IRC servers' SSL certificates against built-in well-known certificate authorities
conf.reject_unauthorised_certificates = false;


// Whitelisted HTTP proxies
conf.http_proxies = ["127.0.0.1"];

// Enabled transports for the client to use
conf.transports = [
    "websocket",
    "flashsocket",
    "htmlfile",
    "xhr-polling",
    "jsonp-polling"
];

// Base HTTP path to the KIWI IRC client (eg. /kiwi)
conf.http_base_path = "/kiwi";


// Default quit message
conf.quit_message = "http://www.kiwiirc.com/ - A hand-crafted IRC client";





/*
 * Do not ammend the below lines unless you understand the changes!
 */
module.exports.production = conf;