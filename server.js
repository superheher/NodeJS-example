const express = require ('express');
const nunjucks = require('nunjucks');
const { execSync } = require('child_process');

const app = express();
app.use(express.static('/public'));

const port = 8080;

let messageOfCommand = "";

const addButton = (command, name, message) => {
	app.get(`/${command}`, function(req, res) {
		messageOfCommand = message;
		res.redirect("/");
	});
	return {
		name: name,
		command: command
	};
};

const env = nunjucks.configure(['views/'], {
	autoescape: true,
	express: app,
});

app.get('/', (req, res) => {
	let listButtons = [];
	listButtons.push(addButton(`on`, `On`, `Condei was turned on.`));
	listButtons.push(addButton(`sensors`, `Sensors`, `Poluchai sesnors.`));
	res.render('index.html', {
		title: 'Main page',
		buttons: listButtons,
		messageOfCommand: messageOfCommand,
	});
	messageOfCommand = "";
});

app.listen(port, function() {
	console.log(`Example app listening on port ${port}...`);
});
