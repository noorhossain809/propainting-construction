import { baseApi } from "./baseApi"

export interface ITeamMember {
    _id: string
    name: string
    designation: string
    image: {
        url: string
        alt: string
    }
    bio?: string
    order: number
    isActive: boolean
    createdAt: string
    updatedAt: string
}

const teamApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllTeamMembers: builder.query<ITeamMember[], void>({
            query: () => "/team",
            transformResponse: (response: { data: ITeamMember[] }) => response.data,
            providesTags: ["Team"],
        }),

        getSingleTeamMember: builder.query<ITeamMember, string>({
            query: (id) => `/team/${id}`,
            transformResponse: (response: { data: ITeamMember }) => response.data,
            providesTags: (result, error, id) => [{ type: "Team", id }],
        }),

        createTeamMember: builder.mutation<ITeamMember, FormData>({
            query: (formData) => ({
                url: "/team",
                method: "POST",
                body: formData,
            }),
            transformResponse: (response: { data: ITeamMember }) => response.data,
            invalidatesTags: ["Team"],
        }),

        updateTeamMember: builder.mutation<ITeamMember, { id: string; formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `/team/${id}`,
                method: "PATCH",
                body: formData,
            }),
            transformResponse: (response: { data: ITeamMember }) => response.data,
            invalidatesTags: (result, error, { id }) => [{ type: "Team", id }, "Team"],
        }),

        deleteTeamMember: builder.mutation<ITeamMember, string>({
            query: (id) => ({
                url: `/team/${id}`,
                method: "DELETE",
            }),
            transformResponse: (response: { data: ITeamMember }) => response.data,
            invalidatesTags: ["Team"],
        }),
    }),
})

export const {
    useGetAllTeamMembersQuery,
    useGetSingleTeamMemberQuery,
    useCreateTeamMemberMutation,
    useUpdateTeamMemberMutation,
    useDeleteTeamMemberMutation,
} = teamApi