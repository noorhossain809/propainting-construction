import TeamMember, { ITeamMember } from "./team.model"


const createIntoDB = async (payload: Partial<ITeamMember>) => {
    const result = await TeamMember.create(payload)
    return result
}

const getAllFromDB = async () => {
    const result = await TeamMember.find().sort({ order: 1, createdAt: -1 })
    return result
}

const getOneByIdFromDB = async (id: string) => {
    const result = await TeamMember.findById(id)
    return result
}

const updateIntoDB = async (id: string, payload: Partial<ITeamMember>) => {
    const result = await TeamMember.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    })
    return result
}

const deleteFromDB = async (id: string) => {
    const result = await TeamMember.findByIdAndDelete(id)
    return result
}

export const TeamService = {
    createIntoDB,
    getAllFromDB,
    getOneByIdFromDB,
    updateIntoDB,
    deleteFromDB,
}