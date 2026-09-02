import ContactInfo, { IContactInfo } from "./contactInfo.model"


const getFromDB = async () => {
    let result = await ContactInfo.findOne()
    if (!result) {
        result = await ContactInfo.create({
            phoneOne: "",
            phoneTwo: "",
            workingHours: "",
            email: "",
            location: "",
            licenseNumber: "",
            insuranceText: "",
        })
    }
    return result
}

const updateIntoDB = async (payload: Partial<IContactInfo>) => {
    const existing = await ContactInfo.findOne()
    if (!existing) {
        const result = await ContactInfo.create(payload)
        return result
    }
    const result = await ContactInfo.findByIdAndUpdate(existing._id, payload, {
        new: true,
        runValidators: true,
    })
    return result
}

export const ContactInfoService = {
    getFromDB,
    updateIntoDB,
}