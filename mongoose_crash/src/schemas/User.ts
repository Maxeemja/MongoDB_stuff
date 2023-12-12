import mongoose, { HydratedDocument, Model } from 'mongoose';

export interface IUser {
	name: string;
	age: number;
	email: string;
	createdAt: Date;
	updatedAt: Date;
	bestFriend: string;
	hobbies: string[];
	address: {
		street: String;
		city: String;
	};
}

// Put all user instance methods in this interface:
export interface IUserMethods {
	sayHi(): void;
}


interface UserModel extends Model<IUser, {}, IUserMethods> {
  findByName(name: string): Promise<HydratedDocument<IUser, IUserMethods>>;
}



const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
	name: { type: String, required: true },
	age: {
		type: Number,
		min: 1,
		max: 99,
		validate: {
			validator: (v) => v % 2 === 0,
			message: (props) => `${props.value} is not and even number`
		}
	},
	email: { type: String, required: true, lowercase: true, minLength: 7 },
	createdAt: {
		type: Date,
		immutable: true,
		default: () => Date.now()
	},
	updatedAt: {
		type: Date,
		default: () => Date.now()
	},
	bestFriend: {
		type: String,
		ref: 'User'
	},
	hobbies: [String],
	address: {
		street: String,
		city: String
	}
});

userSchema.methods.sayHi = function () {
	console.log(`Hi! My name's ${this.name}`);
};

userSchema.statics.findByName = function (name: string) {
	return this.where('name').equals(name);
};

export default mongoose.model<IUser, UserModel>('User', userSchema);
