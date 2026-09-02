import HeroSlide, { IHeroSlide } from "./heroSlide.model"


const createIntoDB = async (payload: Partial<IHeroSlide>) => {
    const result = await HeroSlide.create(payload)
    return result
}

const getAllFromDB = async () => {
    const result = await HeroSlide.find().sort({ order: 1, createdAt: -1 })
    return result
}

const getOneByIdFromDB = async (id: string) => {
    const result = await HeroSlide.findById(id)
    return result
}

const updateIntoDB = async (id: string, payload: Partial<IHeroSlide>) => {
    const result = await HeroSlide.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    })
    return result
}

const deleteFromDB = async (id: string) => {
    const result = await HeroSlide.findByIdAndDelete(id)
    return result
}

export const HeroSlideService = {
    createIntoDB,
    getAllFromDB,
    getOneByIdFromDB,
    updateIntoDB,
    deleteFromDB,
}