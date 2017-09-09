//import UrlFactory, { UrlConfig } from '../';
const UrlFactory = require('../');
const urlConfig = require('../config-example.urls.json'); // This is UrlConfig

describe('config file', () => {

	it('should have defaultHost', () => {
		let defaultHost = urlConfig.hosts["DEV"].default;

		expect(defaultHost).not.toBeNull();
		expect(defaultHost).toEqual("http://dev.example.com");
	});

	it('should have envs', () => {
		expect(urlConfig.hosts).not.toBeNull();
		expect(urlConfig.hosts["DEV"]).not.toBeNull();
	});

	it('should have hosts', () => {
		expect(urlConfig.hosts["DEV"]["CMS"]).toEqual("https://dev.wpexample.com");
	});

	it('should have urls', () => {
		expect(urlConfig.urls).not.toBeNull();
		expect(urlConfig.urls["RETRIEVE_ZONES"]).not.toBeNull();
		expect(urlConfig.urls["RETRIEVE_ZONES"].hostKey).toEqual("CMS");
		expect(urlConfig.urls["RETRIEVE_ZONES"].path).toEqual("/api/zones");
	});
});

describe('urlFactory', () => {
	const urlFactory = new UrlFactory(urlConfig, "DEV");

	it('should have constructed urlFactory', () => {
		expect(urlFactory).not.toBeNull();
		expect(urlFactory.config).not.toBeNull();
	});

	it('should get normal url', () => {
		const url1 = urlFactory.getUrl("RETRIEVE_ZONES");

		expect(url1).toEqual("https://dev.wpexample.com/api/zones");

		const url2 = urlFactory.getUrl("CONTACT_US");

		expect(url2).toEqual("https://dev.profiler.com/api/contact");
	});

	it('should get url with default host', () => {
		const url = urlFactory.getUrl("RETRIEVE_TICKETS_MISSING_HOST");

		expect(url).toEqual("http://dev.example.com/api/tickets");
	});

	it('should get null when missing url', () => {
		const url = urlFactory.getUrl("RETRIEVE_MARIO");

		expect(url).toBeNull();
	});

	it('should get formatted url', () => {
		const url = urlFactory.getUrl("RETRIEVE_USER_FORMATTED", "en", 12);

		expect(url).toEqual("https://dev.wpexample.com/en/user/12");
	});
});