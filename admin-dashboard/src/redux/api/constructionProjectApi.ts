import { baseApi } from "./baseApi"

export interface IProject {
    _id: string
    title: string
    slug: string
    projectType: string
    category: string
    description: string
    location?: string
    duration?: string
    completedDate?: string
    mainImage: {
        url: string
        alt: string
    }
    gallery: string[]
    challenge?: string
    solution?: string
    results: string[]
    testimonial?: {
        text: string
        author: string
        rating: number
    }
    seo?: {
        metaTitle?: string
        metaDescription?: string
        keywords?: string[]
    }
    createdAt: string
    updatedAt: string
}

const constructionProjectApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // GET all projects
        getAllProjects: builder.query<IProject[], void>({
            query: () => "/construction",
            transformResponse: (response: { data: IProject[] }) => response.data,
            providesTags: ["Project"],
        }),

        // GET single project
        getSingleProject: builder.query<IProject, string>({
            query: (id) => `/construction/${id}`,
            transformResponse: (response: { data: IProject }) => response.data,
            providesTags: (result, error, id) => [{ type: "Project", id }],
        }),

        // CREATE project (FormData, because it includes file upload)
        createProject: builder.mutation<IProject, FormData>({
            query: (formData) => ({
                url: "/construction",
                method: "POST",
                body: formData,
            }),
            transformResponse: (response: { data: IProject }) => response.data,
            invalidatesTags: ["Project"],
        }),

        // UPDATE project
        updateProject: builder.mutation<IProject, { id: string; formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `/construction/${id}`,
                method: "PATCH",
                body: formData,
            }),
            transformResponse: (response: { data: IProject }) => response.data,
            invalidatesTags: (result, error, { id }) => [{ type: "Project", id }, "Project"],
        }),

        // DELETE project
        deleteProject: builder.mutation<IProject, string>({
            query: (id) => ({
                url: `/construction/${id}`,
                method: "DELETE",
            }),
            transformResponse: (response: { data: IProject }) => response.data,
            invalidatesTags: ["Project"],
        }),
    }),
})

export const {
    useGetAllProjectsQuery,
    useGetSingleProjectQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = constructionProjectApi