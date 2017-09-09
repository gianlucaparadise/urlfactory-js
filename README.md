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
		"url": "https://raw.githubusercontent.com/gianlucaparadise/urlfactory-js/master/urls.schema.json"
	}
]
```

#### Config Example
Here you can see an example:
```js
{
	"$schema": "https://raw.githubusercontent.com/gianlucaparadise/urlfactory-js/master/urls.schema.json",
	"hosts": {
		"DEV": {
			"default": "http://dev.example.com",
			"CMS": "https://dev.wpexample.com",
			"PROFILER": "https://dev.profiler.com"
		},
		"TEST": {
			"default": "http://test.example.com",
			"CMS": "https://test.wpexample.com",
			"PROFILER": "https://test.profiler.com"
		}
	},
	"urls": {
		"RETRIEVE_ZONES": {
			"hostKey": "CMS",
			"path": "/api/zones"
		},
		"RETRIEVE_FAQ": {
			"hostKey": "CMS",
			"path": "/api/faqs"
		},
		"RETRIEVE_USER": {
			"hostKey": "PROFILER",
			"path": "/api/user"
		},
		"CHANGE_PASSWORD": {
			"hostKey": "PROFILER",
			"path": "/api/password/change"
		},
		"CONTACT_US": {
			"hostKey": "PROFILER",
			"path": "/api/contact"
		},
		"RETRIEVE_TICKETS_MISSING_HOST": {
			"hostKey": "TICKETS",
			"path": "/api/tickets"
		},
		"RETRIEVE_USER_FORMATTED": {
			"hostKey": "CMS",
			"path": "/{0}/user/{1}"
		}
	}
}
```