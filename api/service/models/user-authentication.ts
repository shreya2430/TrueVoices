import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt"; //for password hashing

//Defining the User interface to type the document returned from MongoDB
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    videoCredits: number;
    textCredits: number;
    comparePassword(userpassword: string): Promise<boolean>;
    
}

//Defining the User Schema
const UserSchema: Schema<IUser> = new mongoose.Schema(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        username: { type: String, required: true, unique: true, trim: true, minlength: 3},
        email: {
            type: String, 
            required: true,
            unique: true, 
            trim: true,
            lowercase: true,
            validate: {
                validator: (v: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v),
                message: (props: {value: string}) => `${props.value} is not a valid email!`,
            },
        },
        password: { type: String, required: true, minlength: 8 },
        videoCredits: { type: Number, required: true, default: 2 }, // New field for video credits
        textCredits: { type: Number, required: true, default: 12 },  // New field for text credits
    },
    { timestamps: true }
);

//Hashing the password before saving it to the database
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next (err);
    }
});

//Method to compare the passwords
UserSchema.methods.comparePassword = async function (userpassword: string): Promise<boolean> {
    return await bcrypt.compare(userpassword, this.password);
};


//Create a mongoose model from the Schema
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
