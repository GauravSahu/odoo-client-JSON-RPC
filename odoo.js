var jayson = require('jayson');
var http = require('http');
var _ = require('underscore');

module.exports =  (function (){
    
    function odoo(opts){
	this.opts = opts;
	this.session_id = '';
	this.context = '';
	this.sid = '';

	if (opts && opts.port){
	    this.port = opts.port;
	} else {
	    this.port = '8069';
	}
	
	if (opts && opts.host){
	    this.host = opts.host;
	} else {
	    this.host = 'localhost';
	}

	this.protocol = 'http';
	this.base_location = this.protocol + '://' + this.host + ':' + this.port;
	
	this.paths = {
	    'auth': this.base_location + '/web/session/authenticate',
	    'databases': this.base_location + '/web/database/get_list',
	    'dataset_call_kw': this.base_location + '/web/dataset/call_kw',
	};
    }

    odoo.prototype.database_getlist = function (cb) {
	var client = jayson.client.http(this.paths.databases);

	client.request('call',{'session_id': '', 'context':{}}, 'r8', cb);

    };

    odoo.prototype.auth = function (cb){

	var params = {
	    'db': this.opts.db, 
	    'login': this.opts.login,
	    'password': this.opts.password,
	    'base_location': this.base_location,
	    //'session_id': "",
	    'context': {}
	}

	var json = JSON.stringify({
	    'jsonrpc': '2.0',
	    'method': 'call',
	    'params': params
	});

	var options = {
	    'host': this.host,
	    'port': this.port,
	    'path': '/web/session/authenticate',
	    'method': 'POST',
	    'headers': {
		"Content-Type": "application/json",
		"Accept": "application/json",
		"Content-Length": json.length,
	    }
	};


	var req = http.request(options, function(res){
	    var response = '';

	    res.setEncoding('utf8');
	    
	    var sid = res.headers['set-cookie'][0].split(';')[0];
	    
	    res.on('data', function (chunk){
		response += chunk;
	    });

	    res.on('end',function(){
		if (res.statusCode < 200 || res.statusCode >= 300) {
		    var err = new Error(response);
		    err.code = res.statusCode;
		    return cb(err);
		} else {
		    return cb(null,JSON.parse(response),sid);
		}
	    });
	});

	req.write(json);
    }

    odoo.prototype.rpc = function(path, cb, params, options) {

	params = params || {};
	
	options = options || {
	    host: this.host,
	    port: this.port,
	    path: path || '/',
	    headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
	    }
	};
	
	if (this.sid){
	    var sid = this.sid + ';';
	    options.headers.Cookie = this.sid + ';';
	}
	
	_.defaults(params,{
	    context: this.context || {},
	  //  session_id: this.session_id || {},
	});

	var json_client = jayson.client.http(options);
       console.dir(params);
       console.dir(_.uniqueId('r'));
       console.dir(cb);
	return json_client.request('call', params, _.uniqueId('r'), cb);
    };


    odoo.prototype._call = function (model, method, cb, args, kwargs){
	args = args || [
	    false,
	    "tree",
	    {
		"uid": this.context.uid,
		"lang": this.context.lang,
		"tz": this.context.tz,
	    },
	    true
	];
	
	kwargs = kwargs || {};

	params =  {
	    "kwargs": kwargs,
	    "args": args,
	    "model": model,
	    "method": method,
	}

	this.rpc('/web/dataset/call_kw', cb, params);
    }

    odoo.prototype._create = function (model, args, kwargs, cb) {
	this._call(model, "create", cb, args, kwargs);
      
    }
    
    
    odoo.prototype.get_model = function (model,cb){
	this._call(model,"fields_view_get", cb);
    }


    /**
     * Basic Search
     * 
     */
    odoo.prototype._search = function (model,cb,filter,fields,offset,limit,sort){

	// example of filter = ["code", "=", "1.1.2"]

	fields = fields || [];

	var domain = [];

	if (filter){
	    domain.push(filter);
	}
	
	var params = {
	    "model": model,
	    "domain": domain,
	    "sort": sort,
	    "fields": fields,
	    "limit": limit || 80,
	    "offset": offset || 0
	};

	this.rpc('/web/dataset/search_read', cb, params);

    }

	odoo.prototype._read = function(model,cb,args,method){	
    	var params = {
	    	"model": model,
        	"method" : method,
	    	"args": args
		};
    	this.rpc('/web/dataset/call',cb,params);
    }
    odoo.prototype._delete = function(model,cb,method,resource_id){
    	
    	var params = {
	    	"model": model,
        	"method" : method,
	    	"resource_id": resource_id
		};
    	this.rpc('/web/dataset/call_kw',cb,params);
    }	
        
    return odoo;
})();
