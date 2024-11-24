import mongoose from "mongoose";
import bcrypt from "bcrypt"; //for password hashing

//Defining the User Schema
const UserSchema = new mongoose.Schema({
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
            validator: (v) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v), 
            message: (props) => `${props.value} is not a valid email!`,
        }, 
    }, 
    password: { type: String, required: true, minlength: 8 },  
}, { timestamps: true });

//hashing the password before saving it to the database

UserSchema.pre('save', async function (next){
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

//Method to compare the passwords
UserSchema.methods.comparePassword = async function (userpassword) {
    return await bcrypt.compare(userpassword, this.password);
}

const User = mongoose.model('User', UserSchema);

export default User;