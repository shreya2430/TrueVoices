import mongoose from "mongoose";

//Defining the User Schema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, 
    email: {
        type: String, 
        required: true, 
        unique: true,
        lowercase: true, 
        validate: {
            validator: function (email) {
                //Added simple email validation regex
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
            }, 
            message: 'Invalid email format',
        },  
    },
    password: {type: String, required: true},
    },
    { timestamps: true }, //Added the timestapms for 'createdAt' and 'updatedAt' fields
);

const User = mongoose.model('User', UserSchema);

export default User;