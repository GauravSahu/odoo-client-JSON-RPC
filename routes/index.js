
/*
 * GET home page.
 */
var odoo = require('../odoo.js');
exports.index = function(req, res){
	console.dir(req.query.client_req);
	client_req = req.query.client_req;
	var data =  JSON.parse(client_req);
	console.dir(data.opts.login);
	
	var client = new odoo(data.opts);

	client.auth(on_auth);

// show databases
//client.database_getlist(callback);

	function callback (err,response){
    	console.log(response.result);
    		res.json(response.result);
	}

	function on_auth (err,response,sid){
	    if (err) throw err;
	       console.log(sid);
	    if (response.result.uid){
		//save session
		client.session_id = response.result.session_id;
		client.context = response.result.user_context;
		client.sid = sid;

	
		//client.get_model('hr.employee',callback);

	
		var args = [data.moduleDetail.args];
		var model = data.moduleDetail.model;
		var method  = data.moduleDetail.method;
		var filter = data.moduleDetail.filter;
		var fields = data.moduleDetail.fields;
		var domain = data.moduleDetail.domain;
		var offset = data.moduleDetail.offset;
		var limit = data.moduleDetail.limit;
		var sort = data.moduleDetail.sort;
		if(method =='create'){
			client._create(model, args, undefined, callback);
		}
		else if(method=='search'){
			client._search(model,callback,filter,fields,offset,limit,sort);
		}
		else if(method=='read'){
			client._read(model,callback,args,method);
		}
		else if(method=='unlink'){
			client._delete(model,callback,method,args);
		}
		else if(method=='write'){
			client._write(model,callback,method,args);
		}
	}

}


	
};
