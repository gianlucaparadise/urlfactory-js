declare module "urlfactory-js" {
    export type Url = {
        /**
         * This is the key to be searched in UrlConfig.hosts
         */
        hostKey: string;
        /**
         * This is the endpoint of a url. Example: /gmail
         */
        path: string;
    }

    /**
     * This is a Map where 'key' is the name of the host and 'value' is the host.
     * Requires a key named 'default' which is used when Url.hostKey is not found in 'hosts'
     * Example of value: http://google.com
     */
    export type Environment = {
        [key in (string | "default")]: string;
    }

    /**
     * This is a Map where 'key' is the name of the environment and 'value' is the list of the hosts.
     */
    export type Hosts = {
        [key: string]: Environment;
    }

    /**
     * This is a Map where 'key' is the name of the url and 'value' is a Url object.
     */
    export type Urls = {
        [key: string]: string;
    }

    export type UrlConfig = {
        hosts: Hosts;
        urls: Urls;
    }

    /**
     * This handles your *.urls.json config file
     */
    export default class UrlFactory {
        public constructor(config: UrlConfig, environment: string);

        /**
         * Set environment key name
         * @param {string} environment Environment key name
         */
        public setEnvironment(environment: string): void;

        /**
         * Get environment using the key previously set
         * @returns {Environment}
         */
        public getEnvironment(): Environment;

        /**
         * Get default host for current environment
         * @returns {string}
         */
        public getDefault(): string;

        /**
         * Get host value and returns defaultHost if not present
         * @param {string} key Host key name
         * @returns {string}
         */
        public getHost(key: string): string;

        /**
         * Build url appending Url.path to host retrieved using 'getHost'
         * @param {string} key Url key name
         * @param {any[]} params List of params for positional placeholders formatting. Example of path: "/{0}/user/{1}"
         * @returns {(string)}
         */
        public getUrl(key: string, ...params: any[]): string;
    }
}