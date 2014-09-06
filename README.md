odoo JSON-RPC Client using NODE js
===================
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
