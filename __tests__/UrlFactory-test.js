//import UrlFactory, { UrlConfig } from '../';
const UrlFactory = require('../');
const urlConfig = require('../config-example.urls.json'); // This is UrlConfig

describe('config file', () => {

	it('should have defaultHost', () => {
		let defaultHost = urlConfig.hosts["SIT"].default;

		expect(defaultHost).not.toBeNull();
		expect(defaultHost).toEqual("http://w-sit.dpr.com:8181");
	});

	it('should have envs', () => {
		expect(urlConfig.hosts).not.toBeNull();
		expect(urlConfig.hosts["SIT"]).not.toBeNull();
	});

	it('should have hosts', () => {
		expect(urlConfig.hosts["SIT"]["CMS"]).toEqual("https://sit.dpr.com");
	});

	it('should have urls', () => {
		expect(urlConfig.urls).not.toBeNull();
		expect(urlConfig.urls["RETRIEVE_ZONES"]).not.toBeNull();
		expect(urlConfig.urls["RETRIEVE_ZONES"].hostKey).toEqual("CMS");
		expect(urlConfig.urls["RETRIEVE_ZONES"].path).toEqual("/en/mobile/listZones");
	});
});

describe('urlFactory', () => {
	const urlFactory = new UrlFactory(urlConfig, "SIT");

	it('should have constructed urlFactory', () => {
		expect(urlFactory).not.toBeNull();
		expect(urlFactory.config).not.toBeNull();
	});

	it('should get normal url', () => {
		const url1 = urlFactory.getUrl("RETRIEVE_ZONES");

		expect(url1).toEqual("https://sit.dpr.com/en/mobile/listZones");

		const url2 = urlFactory.getUrl("CONTACT_US");

		expect(url2).toEqual("https://sit-myid.dpr.com/services/dpr/notification/send");
	});

	it('should get url with default host', () => {
		const url = urlFactory.getUrl("RETRIEVE_TICKETS_MISSING_HOST");

		expect(url).toEqual("http://w-sit.dpr.com:8181/services/dpr/products");
	});

	it('should get null when missing url', () => {
		const url = urlFactory.getUrl("RETRIEVE_MARIO");

		expect(url).toBeNull();
	});

	it('should get formatted url', () => {
		const url = urlFactory.getUrl("RETRIEVE_USER_FORMATTED", "en", 12);

		expect(url).toEqual("https://sit.dpr.com/en/user/12");
	});
});