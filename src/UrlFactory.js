/**
 * @typedef {Object} Url
 * @prop {string} hostKey - This is the key to be searched in UrlConfig.hosts
 * @prop {string} path - This is the endpoint of a url. Example: /gmail
 */

/**
 * This is a Map where 'key' is the name of the host and 'value' is the host.
 * Requires a key named 'default' which is used when Url.hostKey is not found in 'hosts'
 * Example of value: http://google.com
 * @typedef {{ [key: (string | "default")]: string }} Environment
 * typedef {Object<string, string>} Environment
 */

/**
 * This is a Map where 'key' is the name of the environment and 'value' is the list of the hosts.
 * @typedef {{ [key: string]: Environment }} Hosts
 * typedef {Object<string, Environment>} Hosts
 */

/**
 * This is a Map where 'key' is the name of the url and 'value' is a Url object.
 * @typedef {{ [key: string]: string }} Urls
 * typedef {Object<string, string>} Urls
 */

/**
 * @typedef {Object} UrlConfig
 * @prop {Hosts} hosts
 * @prop {Urls} urls
 */

/**
 * This handles your *.urls.json config file
 */
class UrlFactory {

	/**
	 * 
	 * @param {UrlConfig} config 
	 * @param {string} environment 
	 */
	constructor(config, environment) {
		this.config = config;
		this.environment = environment;
	}

	/**
	 * Set environment key name
	 * @param {string} environment Environment key name
	 */
	setEnvironment(environment) {
		this.environment = environment;
	}

	/**
	 * Get environment using the key previously set
	 * @returns {Environment}
	 */
	getEnvironment() {
		let hosts = this.config.hosts;
		let env = hosts[this.environment];

		return env;
	}

	/**
	 * Get default host for current environment
	 * @returns {string}
	 */
	getDefault() {
		let env = this.getEnvironment();
		return env.default ? env.default : "";
	}

	/**
	 * Get host value and returns defaultHost if not present
	 * @param {string} key Host key name
	 * @returns {string}
	 */
	getHost(key) {
		let host = this.getDefault();
		let env = this.getEnvironment();

		if (key && env) {
			const myHost = env[key];

			if (myHost) {
				host = myHost;
			}
		}

		return host;
	}

	/**
	 * Build url appending Url.path to host retrieved using 'getHost'
	 * @param {string} key Url key name
	 * @param {any[]} params List of params for positional placeholders formatting. Example of path: "/{0}/user/{1}"
	 * @returns {(string | null)}
	 */
	getUrl(key, ...params) {
		const url = this.config.urls[key];
		if (!url) return null;

		let host = this.getHost(url.hostKey);

		let formattedPath = sformat(url.path, params);
		let result = host + formattedPath;
		return result;
	}
}

module.exports = UrlFactory;

/**
 * String format with positional placeholders.
 * Example: sformat("Hello {0}, I'm {1}", "World", "fine"); returns "Hello World, I'm fine"
 * @param {string} baseString String to be formatted
 * @param {any[]} parameters Ordered parameters
 */
//function sformat(baseString: string, ...parameters: any[]) {
function sformat(baseString, parameters) {
	var pattern = /\{\{|\}\}|\{(\d+)\}/g;
	return baseString.replace(pattern, function (match, group) {
		var value;
		if (match === "{{")
			return "{";
		if (match === "}}")
			return "}";
		value = parameters[parseInt(group, 10)];
		return value ? value.toString() : match;
	});
}