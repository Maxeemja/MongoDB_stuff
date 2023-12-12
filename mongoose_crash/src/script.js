const { default: mongoose } = require('mongoose');
const User = require('./User');

mongoose.connect('mongodb://127.0.0.1:27017/newDB').then(() => {
	console.log('connected');
});

async function run() {
	const user = new User({ name: 'Kyle', age: 26 });
	await user.save();
}

run();
