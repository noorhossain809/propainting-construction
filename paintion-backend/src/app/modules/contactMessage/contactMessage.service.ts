import ContactMessage, { IContactMessage } from "./contactMessage.model"

const createIntoDB = async (payload: Partial<IContactMessage>) => {
    const result = await ContactMessage.create(payload)
    return result
}

const getAllFromDB = async () => {
    const result = await ContactMessage.find().sort({ createdAt: -1 })
    return result
}

const getOneByIdFromDB = async (id: string) => {
    const result = await ContactMessage.findById(id)
    return result
}

const updateStatusInDB = async (id: string, status: string) => {
    const result = await ContactMessage.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
    )
    return result
}

const deleteFromDB = async (id: string) => {
    const result = await ContactMessage.findByIdAndDelete(id)
    return result
}

export const ContactMessageService = {
    createIntoDB,
    getAllFromDB,
    getOneByIdFromDB,
    updateStatusInDB,
    deleteFromDB,
}
