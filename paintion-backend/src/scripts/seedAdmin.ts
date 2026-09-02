// src/scripts/seedAdmin.ts
import mongoose from "mongoose"
import dotenv from "dotenv"
import User from "../app/modules/user/user.modal"

dotenv.config()

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL as string)
        console.log("Database connected")

        const existing = await User.findOne({ email: "noorhossainvip809@gmail.com" })
        if (existing) {
            console.log("Admin already exists, skipping.")
            process.exit(0)
        }

        // bcrypt.hash() এখানে করা হচ্ছে না — model এর pre("save") hook নিজে hash করে দেবে
        await User.create({
            name: "Admin",
            email: "noorhossainvip809@gmail.com",
            password: "admin1234",
            role: "admin",
        })

        console.log("Admin created successfully")
        process.exit(0)
    } catch (err) {
        console.error("Error seeding admin:", err)
        process.exit(1)
    }
}

seedAdmin()