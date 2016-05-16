odoo JSON-RPC Client using NODE js
===================

[![Join the chat at https://gitter.im/GauravSahu/odoo-client-JSON-RPC](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/GauravSahu/odoo-client-JSON-RPC?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
JSON-RPC is known as a web service. Web services are a set of tools that let one build distributed applications on top of existing web infrastructures. These applications use the Web as a kind of "transport layer" but don't offer a direct human interface via the browser.
<br>
An JSON-RPC call is conducted between two parties: the client (the calling process) and the server (the called process). A server is made available at a particular URL (such as http://example.org:8080/rpcserv/).
<br>
<h2>Instructions</h2>
===================
<pre>
node app.js
</pre>
<br>
<h2>Client JSON</h2>
localhost:3000/odoo-client
<br>
<pre>
client_req = {
	"opts" : {
		"login" : "admin",
       		"password" : "123",
       		"db" : "test",
       		"host": "localhost",
       		"port": "8069"
  	},
  	"moduleDetail" : {
  		"model" : "hr.employee",
  		"method" : "create",
  		"args" : {
  			"name" : "Gaurav"
  		},
  		"filter" : "",
  		"fields" : "",
  		"domain" : "",
  		"offset" : "",
  		"limit" : "",
  		"sort" : "",
  		"resource_id":""
  	}
}
</pre>

<h3>To Create a New Record  </h3>
<pre>
client_req = {
	"opts" : {
		"login" : "admin",
       		"password" : "123",
       		"db" : "test",
       		"host": "localhost",
       		"port": "8069"
  	},
  	"moduleDetail" : {
  		"model" : "hr.employee",
  		"method" : "create",
  		"args" : {
  			"name" : "Gaurav"
  		},
  		"filter" : "",
  		"fields" : "",
  		"domain" : "",
  		"offset" : "",
  		"limit" : "",
  		"sort" : "",
  		"resource_id":""
  	}
}
</pre>
<br/>
<hr />
<br/>
<h3>To Update a Record  </h3>
<pre>
client_req = {
	"opts" : {
		"login" : "admin",
       		"password" : "123",
       		"db" : "test",
       		"host": "localhost",
       		"port": "8069"
  	},
  	"moduleDetail" : {
  		"model" : "hr.employee",
  		"method" : "write",
  		"args" : [1,{          // Here 1 is id of record
  			"name" : "Gaurav"
  		}],
  		"filter" : "",
  		"fields" : "",
  		"domain" : "",
  		"offset" : "",
  		"limit" : "",
  		"sort" : "",
  		"resource_id":""
  	}
}
</pre>
<br/>
<hr />
<br/>
<h3>To Delete a Record</h3>
<pre>
client_req = {
	"opts" : {
		"login" : "admin",
       		"password" : "123",
       		"db" : "test",
       		"host": "localhost",
       		"port": "8069"
  	},
  	"moduleDetail" : {
  		"model" : "hr.employee",
  		"method" : "unlink",
  		"args" : [1],  // id of record
  		"filter" : "",
  		"fields" : "",
  		"domain" : "",
  		"offset" : "",
  		"limit" : "",
  		"sort" : "",
  		"resource_id":""
  	}
}
</pre>

<br/>
<hr />
<br/>
<h3>To Read a Specific Record</h3>
<pre>
client_req = {
	"opts" : {
		"login" : "admin",
       		"password" : "123",
       		"db" : "test",
       		"host": "localhost",
       		"port": "8069"
  	},
  	"moduleDetail" : {
  		"model" : "hr.employee",
  		"method" : "read",
  		"args" : [1],  // id of record
  		"filter" : "",
  		"fields" : "",
  		"domain" : "",
  		"offset" : "",
  		"limit" : "",
  		"sort" : "",
  		"resource_id":""
  	}
}
</pre>

<br/>
<hr />
<br/>
<h3>To Search a Record</h3>
<pre>
client_req = {
	"opts" : {
		"login" : "admin",
       		"password" : "123",
       		"db" : "test",
       		"host": "localhost",
       		"port": "8069"
  	},
  	"moduleDetail" : {
  		"model" : "hr.employee",
  		"method" : "search",
  		"args" : [1,20],  // range of id 
  		"filter" : "",//[["name","=","Gaurav"]]
  		"fields" : "",
  		"domain" : "",
  		"offset" : "",
  		"limit" : "",
  		"sort" : "",
  		"resource_id":""
  	}
}
</pre>






