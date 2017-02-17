'use strict'
/* 
	Fallback server for supporting browserHistory
	in your React application. 
*/

//instatiate path and express
const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const Sequelize = require('sequelize');


var connect = process.env.DATABASE_URL || 'postgres://ericcalabrese:password@localhost:5432/blog_db';

var port = process.env.PORT || 3000;

var sequelize = new Sequelize(connect);

var BlogPosts = sequelize.define('BlogPosts', {
	title: {
		type:Sequelize.STRING,
		unique: true
	},
	body: Sequelize.TEXT,
});

//use the public folder as the static directory. 
app.use( express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }))
 
app.use(bodyParser.json())

//send any route to index.html where the react app is mounted
// app.get('*', (req,res)=>{
// 	res.sendFile(path.join(__dirname,'public/index.html'))
// })

app.get('/blog', function(req, res) {
	BlogPosts.findAll().then(function(blogposts){
		res.json(blogposts);
	}) 
})

app.post('/post', function(req, res) {
	BlogPosts.create(req.body).then(function(blogposts){
		console.log(req.body);
		res.json(blogposts);
	});
});

sequelize.sync().then(function(){
	console.log("Synced!");


app.listen(port, function() {
	console.log("Listening on " + port);

	});
}); 


// app.listen(3000,()=>console.log('running on localhost:3000'))