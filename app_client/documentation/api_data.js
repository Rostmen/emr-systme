define({ "api": [  {    "type": "post",    "url": "/api/login",    "title": "Sign In",    "version": "0.0.1",    "name": "SignIn",    "group": "Authorization",    "description": "<p>Authenticate User using credentials.</p>",    "permission": [      {        "name": "public",        "title": "Public access",        "description": "<p>This is public access group</p>"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>User email.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>User password.</p>"          }        ]      }    },    "header": {      "examples": [        {          "title": "Request-Example:",          "content": "{\n   \"email\": \"jsmith@example.com\"\n   \"password\": \"qwerty123\"\n}",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>Auth token.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OGYxNDRhYzQ2MTJlZjEwZjYxZmEwYTIiLCJlbWFpbCI6IndAZS5yIiwiZXhwIjoxNDkyODI2ODI5LCJpYXQiOjE0OTIyMjIwMjl9.I25aIQiFBv1wAGYAgApxzweBlfdaO_GHKpdgSCqDWek\"\n}",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 401 Not Found\n{\n  \"message\": \"Password is wrong\"\n}",          "type": "json"        }      ]    },    "filename": "app_api/controllers/authentication.js",    "groupTitle": "Authorization"  },  {    "type": "post",    "url": "/api/register",    "title": "Sign Up",    "version": "0.0.1",    "name": "SignUp",    "group": "Authorization",    "description": "<p>Register User.</p>",    "permission": [      {        "name": "public",        "title": "Public access",        "description": "<p>This is public access group</p>"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>User email.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>User password.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "username",            "description": "<p>The username.</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": true,            "field": "fullname",            "description": "<p>User first and last name.</p>"          }        ]      }    },    "header": {      "examples": [        {          "title": "Request-Example:",          "content": "{\n \"fullname\":\"John Smith\",\n \"email\":\"jsmith@example.com\",\n \"username\":\"jsmith\",\n \"password\":\"qwerty123\"\n}",          "type": "json"        }      ]    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "token",            "description": "<p>Auth token.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"token\": \"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OGYxNDRhYzQ2MTJlZjEwZjYxZmEwYTIiLCJlbWFpbCI6IndAZS5yIiwiZXhwIjoxNDkyODI2ODI5LCJpYXQiOjE0OTIyMjIwMjl9.I25aIQiFBv1wAGYAgApxzweBlfdaO_GHKpdgSCqDWek\"\n}",          "type": "json"        }      ]    },    "filename": "app_api/controllers/authentication.js",    "groupTitle": "Authorization",    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "PasswordInvalid",            "description": "<p>The password should be longer.</p>"          },          {            "group": "Error 4xx",            "optional": false,            "field": "UsernameExists",            "description": "<p>The username alredy exists.</p>"          }        ]      },      "examples": [        {          "title": "PasswordInvalid:",          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Password should be longer\"\n}",          "type": "json"        },        {          "title": "UsernameExists:",          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Username alredy exists\"\n}",          "type": "json"        }      ]    }  },  {    "type": "post",    "url": "/api/profile",    "title": "Create",    "version": "0.0.1",    "name": "Create",    "group": "Record",    "description": "<p>Create a new Record.</p>",    "permission": [      {        "name": "user",        "title": "User access only",        "description": "<p>This is private access group</p>"      }    ],    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "Object",            "optional": false,            "field": "payload",            "description": "<p>Any data.</p>"          },          {            "group": "Parameter",            "type": "Object",            "optional": true,            "field": "source_info",            "description": "<p>Source info. For example, if you need to sync some data, you could use 'uuid' from client side.</p>"          }        ]      },      "examples": [        {          "title": "payload:",          "content": "{\n   \"pulse\": 60,\n   \"systolic\": 120,\n   \"diastolic\": 80,\n   \"map\": 100,\n   \"spo2\": 70\n}",          "type": "json"        },        {          "title": "source_info:",          "content": "{\n   \"device\": {\n     \"identifier\": \"com.apple.health.246000F5-A376-47F4-A117-195937A0F3C3\",\n     \"name\": \"Apple Watch\"\n   },\n   \"uuid\": \"5DF7941C-01E6-4591-878B-56E98AE65284\"\n}",          "type": "json"        }      ]    },    "header": {      "examples": [        {          "title": "Request-Example:",          "content": " {\n  \"payload\": {\n    \"pulse\": 60,\n    \"systolic\": 120,\n    \"diastolic\": 80,\n    \"map\": 100,\n    \"spo2\": 70\n  },\n  \"source_info\": {\n    \"device\": {\n      \"name\":\"Apple Watch\",\n      \"identifier\":\"com.apple.health.246000F5-A376-47F4-A117-195937A0F3C3\"\n    },\n    \"uuid\": \"5DF7941C-01E6-4591-878B-56E98AE65284\"\n  }\n}",          "type": "json"        },        {          "title": "Header-Example:",          "content": "{\n  \"Authorization\": \"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OGYxNDRhYzQ2MTJlZjEwZjYxZmEwYTIiLCJlbWFpbCI6IndAZS5yIiwiZXhwIjoxNDkyODI2ODI5LCJpYXQiOjE0OTIyMjIwMjl9.I25aIQiFBv1wAGYAgApxzweBlfdaO_GHKpdgSCqDWek\"\n}",          "type": "json"        }      ],      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "Authorization",            "description": "<p>The Auth token retrived during login.</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "_id",            "description": "<p>Uniq record identifier.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "creator",            "description": "<p>Creator User identifier.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "payload",            "description": "<p>Object with any data.</p>"          },          {            "group": "Success 200",            "type": "Object",            "optional": false,            "field": "source_info",            "description": "<p>Object with source data.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 201 Created\n{\n    \"__v\": 0,\n    \"creator\": \"58f19190fb730d2b619171be\",\n    \"payload\": {\n        \"pulse\": \"12\",\n        \"map\": \"12\",\n        \"diastolic\": \"12\",\n        \"systolic\": \"12\"\n    },\n    \"_id\": \"58f193f543f2d82d6df2e941\",\n    \"created_at\": \"2017-04-15T03:31:01.062Z\",\n    \"source_info\": {\n        \"device\": {\n            \"name\": \"unknown\",\n            \"identifier\": \"safari/10.1\"\n        }\n    }\n}",          "type": "json"        }      ]    },    "filename": "app_api/controllers/record.js",    "groupTitle": "Record",    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "Unauthorized",            "description": "<p>The request is not authorized.</p>"          }        ]      },      "examples": [        {          "title": "Unauthorized:",          "content": "HTTP/1.1 401 Not Found\n{\n   \"error\": \"Unauthorized\"\n}",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/api/profile",    "title": "Profile",    "version": "0.0.1",    "name": "Profile",    "group": "User",    "description": "<p>Get user profile.</p>",    "permission": [      {        "name": "user",        "title": "User access only",        "description": "<p>This is private access group</p>"      }    ],    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "_id",            "description": "<p>Uniq user identifier.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "firstname",            "description": "<p>User firstname.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "lastname",            "description": "<p>User lastname.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "fullname",            "description": "<p>User firstname + ' ' + lastname.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>User email.</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>The same as _id.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n   \"_id\": \"58f18902784a0b21bf06ca97\"\n   \"lastname\": \"Smith\",\n   \"firstname\": \"John\",\n   \"fullname: \"John Smith\",\n   \"email\": \"jsmith@example.com\",\n   \"username\": \"jsmith\",\n   \"id\": \"58f18902784a0b21bf06ca97\"\n}",          "type": "json"        }      ]    },    "filename": "app_api/controllers/profile.js",    "groupTitle": "User",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "Authorization",            "description": "<p>The Auth token retrived during login.</p>"          }        ]      },      "examples": [        {          "title": "Header-Example:",          "content": "{\n  \"Authorization\": \"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1OGYxNDRhYzQ2MTJlZjEwZjYxZmEwYTIiLCJlbWFpbCI6IndAZS5yIiwiZXhwIjoxNDkyODI2ODI5LCJpYXQiOjE0OTIyMjIwMjl9.I25aIQiFBv1wAGYAgApxzweBlfdaO_GHKpdgSCqDWek\"\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "Unauthorized",            "description": "<p>The request is not authorized.</p>"          }        ]      },      "examples": [        {          "title": "Unauthorized:",          "content": "HTTP/1.1 401 Not Found\n{\n   \"error\": \"Unauthorized\"\n}",          "type": "json"        }      ]    }  }] });
