import mongoose from "mongoose";
import bcrypt from "bcrypt"; //for password hashing

const UserSchema = new mongoose.Schema({
    
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
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
}, 
{ timestamps: true });

//hashing the password before saving it to the database
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
});

//method to compare the passwords
UserSchema.methods.comparePassword = async function (userpassword) {
    return await bcrypt.compare(userpassword, this.password);
};

//Static method to update user profile
UserSchema.statics.updateUserProfile = async function (userId, updateData) {
    try {
        const { password, confirmPassword } = updateData;

        //validate password if password is being updated
        if (password || confirmPassword) {
            if (password !== confirmPassword) {
                throw new Error("Passwords do not match!");
            }
            const salt = await bcrypt.genSalt(10);
            rest.password = await bcrypt.hash(password, salt);
        }

        //Update user profile fields
        const updatedUser = await this.findByIdAndUpdate(userId, 
            { $set: rest }, 
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            throw new Error("User not found!");
        }
        return updatedUser;
    } catch (error) {
        throw new Error(error.message);
    }
};

const UserManage = mongoose.model('UserManage', UserSchema);
export default UserManage;