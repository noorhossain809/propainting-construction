import Service, { IService } from "./service.modal"

const createIntoDB = async (payload: Partial<IService>) => {
    const result = await Service.create(payload)
    return result
}

const getAllFromDB = async () => {
    const result = await Service.find().sort({ order: 1, createdAt: -1 })
    return result
}

const getOneByIdFromDB = async (id: string) => {
    const result = await Service.findById(id)
    return result
}

const getOneBySlugFromDB = async (slug: string) => {
    const result = await Service.findOne({ slug })
    return result
}

const updateIntoDB = async (id: string, payload: Partial<IService>) => {
    const result = await Service.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    })
    return result
}

const deleteFromDB = async (id: string) => {
    const result = await Service.findByIdAndDelete(id)
    return result
}

export const ServiceService = {
    createIntoDB,
    getAllFromDB,
    getOneByIdFromDB,
    getOneBySlugFromDB,
    updateIntoDB,
    deleteFromDB,
}