// src/scripts/seedContactInfo.ts — একবার চালিয়ে ডিলিট করে দিন
import mongoose from "mongoose"
import dotenv from "dotenv"
import ContactInfo from "../app/modules/contactInfo/contactInfo.model"


dotenv.config()

const seedContactInfo = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL as string)
        console.log("Database connected")

        const existing = await ContactInfo.findOne()

        const contactData = {
            phoneOne: "+1 (917) 539-8168",
            phoneTwo: "+1 (212) 380-3751",
            workingHours: "Mon-Fri 7AM-6PM",
            email: "mrh_nyc@yahoo.com",
            location: "4017, ave D, Brooklyn New York, 11203",
            licenseNumber: "2105436-DCA",
            insuranceText: "Fully insured for your protection",
        }

        if (existing) {
            // আগে থেকে document থাকলে সেটাই আপডেট করে দাও, duplicate না বানিয়ে
            await ContactInfo.findByIdAndUpdate(existing._id, contactData, {
                new: true,
                runValidators: true,
            })
            console.log("Existing Contact Info updated successfully")
        } else {
            await ContactInfo.create(contactData)
            console.log("Contact Info created successfully")
        }

        process.exit(0)
    } catch (err) {
        console.error("Error seeding contact info:", err)
        process.exit(1)
    }
}

seedContactInfo()