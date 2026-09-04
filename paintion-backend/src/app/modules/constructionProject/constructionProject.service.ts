import Project, { IProject } from "./constructionProject.modal"


const createIntoDB = async (payload: Omit<IProject, keyof Document | 'createdAt' | 'updatedAt'>) => {
    const result = await Project.create(payload)
    return result
}

const getAllFromDB = async () => {
    const result = await Project.find()

    return result
}
const getOneByIdFromDB = async (id: string) => {
    const result = await Project.findById({_id: id})
    console.log('result Project', result)
    return result
}

const updateIntoDB = async (id: string, payload: Partial<IProject>) => {
    const result = await Project.findByIdAndUpdate(id, payload, {
        new: true,          // return the updated document
        runValidators: true, // run schema validation on update too
    })
    return result
}

const deleteFromDB = async (id: string) => {
    const result = await Project.findByIdAndDelete(id)
    return result
}

export const ConstructionProjectService = {
    createIntoDB,
    getAllFromDB,
    getOneByIdFromDB,
    updateIntoDB,
    deleteFromDB

}