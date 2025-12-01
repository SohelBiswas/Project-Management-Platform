import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    avatar: {
        type: {
            url: String,
            local: String
        },
        default: {
            url:`https://placehold.co/200x200`,
            local: ""
        }
    },
    userName: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        require: [true,"Password required"]
    },
    fullName: {
        Type: String,
        require: true,
        trim: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String
    },
    forgotPassrowdToken:{
        type: String
    },
    forgotPassrowdExpiry:{
        Type: Data
    },
    emailVerificationToken: {
        type: String
    },
    emailVerificationExpiry: {
        type: Date
    },

})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const user = mongoose.model("User", userSchema)