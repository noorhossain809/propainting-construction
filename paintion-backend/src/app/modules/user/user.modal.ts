import { Schema, model, Document } from "mongoose"
import bcrypt from "bcrypt"

export interface IUser extends Document {
    name: string
    email: string
    password?: string          // Google user এর password থাকবে না
    googleId?: string
    provider: "credentials" | "google"
    role: "admin"
    comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true },
        password: { type: String, select: false },
        googleId: { type: String },
        provider: { type: String, enum: ["credentials", "google"], default: "credentials" },
        role: { type: String, enum: ["admin"], default: "admin" },
    },
    { timestamps: true }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password") || !this.password) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.comparePassword = async function (candidatePassword: string) {
    if (!this.password) return false
    return bcrypt.compare(candidatePassword, this.password)
}

const User = model<IUser>("User", userSchema)
export default User