# UrlFactory

### Config File Instructions

##### Apply JSON Schema
You can write your configurations in a file named `*.urls.json`. For applying the JSON Schema validator in VS Code, add this configuration in your `settings.json` file:
```js
"json.schemas": [
	{
		"fileMatch": [
			"/*.urls.json"
		],
		"url": "./source/libraries/UrlFactory/urls.schema.json"
	}
]
```

#### Config Example
Here you can see an example:
```js
{
	"$schema": "./urls.schema.json",
	"hosts": {
		"SIT": {
			"default": "http://w-sit.dpr.com:8181",
			"CMS": "https://sit.dpr.com",
			"JAWS": "https://sit-myid.dpr.com"
		},
		"UAT": {
			"default": "http://w-uat.dpr.com:8181",
			"CMS": "https://uat.dpr.com",
			"JAWS": "https://uat-myid.dpr.com"
		}
	},
	"urls": {
		"RETRIEVE_ZONES": {
			"hostKey": "CMS",
			"path": "/en/mobile/listZones"
		},
		"RETRIEVE_POIS": {
			"hostKey": "CMS",
			"path": "/en/mobile/listOfPoi"
		},
		"RETRIEVE_FAQ": {
			"hostKey": "CMS",
			"path": "/en/mobile/retrieveFaqs"
		},
		"MANAGE_USER_DETAILS": {
			"hostKey": "JAWS",
			"path": "/services/dpr/user/manageuserdetails"
		},
		"CHANGE_PASSWORD": {
			"hostKey": "JAWS",
			"path": "/services/dpr/user/changepassword"
		},
		"CONTACT_US": {
			"hostKey": "JAWS",
			"path": "/services/dpr/notification/send"
		},
		"RETRIEVE_COUPON": {
			"hostKey": "JAWS",
			"path": "/services/dpr/promotions"
		},
		"RETRIEVE_TICKETS_MISSING_HOST": {
			"hostKey": "VGS",
			"path": "/services/dpr/products"
		},
		"RETRIEVE_USER_FORMATTED": {
			"hostKey": "CMS",
			"path": "/{0}/user/{1}"
		}
	}
}
```