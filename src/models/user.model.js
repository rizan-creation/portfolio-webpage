import { Schema, model } from "mongoose"; 
import bcrypt from "bcrypt";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        // match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address']
    },
    password: {
        type: String,  
        required: true, 
    }
});

// Hash password before saving to database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next() ;
    this.password = await bcrypt.hash(this.password, 10);
   next() ;
});

const User = model("User", userSchema);

export default User; 