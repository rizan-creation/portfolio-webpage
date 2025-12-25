import { Schema, model } from "mongoose"; // 1. Added 'model' here
import bcrypt from "bcrypt";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address']
    },
    password: {
        type: String,   // 2. Changed 'string' to 'String' (Capitalized)
        required: true, // 3. Changed 'false' to 'true'
    }
});

// Hash password before saving to database
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
    
});

const User = model("User", userSchema);

export default User; 