import { Schema, model, Document } from "mongoose"

export interface ITeamMember extends Document {
    name: string
    designation: string       // e.g. "CEO", "Project Manager", "Lead Painter"
    image: {
        url: string
        alt: string
    }
    bio?: string
    order: number
    isActive: boolean
    createdAt: Date
    updatedAt: Date
}

const teamMemberSchema = new Schema<ITeamMember>(
    {
        name: { type: String, required: true },
        designation: { type: String, required: true },
        image: {
            url: { type: String, required: true },
            alt: { type: String, default: "" },
        },
        bio: { type: String },
        order: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
)

const TeamMember = model<ITeamMember>("TeamMember", teamMemberSchema)
export default TeamMember