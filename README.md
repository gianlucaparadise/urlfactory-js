# UrlFactory

This library helps you handling and building the urls depending on current environment.

## Installation

```shell
yarn add urlfactory-js
```
or
```shell
npm i urlfactory-js --save
```

## Basic Usage

Create the UrlFactory:
```js
const UrlFactory = require('urlfactory-js');
const urlConfig = require('../../config/urls/urls.config.json'); // path to urls config file
const urlFactory = new UrlFactory(urlConfig, 'DEV'); // 'DEV' is the name of the environment you want to use
```
Get the urls:
```js
const url = urlFactory.getUrl('RETRIEVE_FAQ');
```

## Config File Instructions

### Config Example
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

### Apply JSON Schema
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

Otherwise you can include this line on top of your config file (see *Config Example*)

```js
"$schema": "https://raw.githubusercontent.com/gianlucaparadise/urlfactory-js/master/urls.schema.json"
```