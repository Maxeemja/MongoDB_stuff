import mongoose from 'mongoose';
import User from './schemas/User';

void mongoose.connect('mongodb://127.0.0.1:27017/newDB').then(() => {
	console.log('connected');
});

async function run(): Promise<void> {
	try {
		// const user = await User.findOne({ name: 'Kyle' });
		const user = await User.findByName('Kyle');
		// user?.sayHi();
		console.log(user);

		// const user = await User.create({
		// 	name: 'Kyle',
		// 	age: 22,
		// 	email: "TEST@gmail.com",
		// 	hobbies: ['Bowling'],
		// 	address: {
		// 		street: "Main St"
		// 	}
		// });
	} catch (e) {
		console.log(e.message);
	}
}

run();
