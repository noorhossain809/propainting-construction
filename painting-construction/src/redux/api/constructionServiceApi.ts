import { baseApi } from "./baseApi"

export interface IService {
    _id: string
    title: string
    slug: string
    shortDescription: string
    subtitle: string
    heroImage: {
        url: string
        alt: string
    }
    contentImage: {
        url: string
        alt: string
    }
    contentTitle: string
    contentDescription: string
    order: number
    isActive: boolean
    seo?: {
        metaTitle?: string
        metaDescription?: string
        keywords?: string[]
    }
    createdAt: string
    updatedAt: string
}

const serviceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllServices: builder.query<IService[], void>({
            query: () => "/services",
            transformResponse: (response: { data: IService[] }) => response.data,
            providesTags: ["Service"],
        }),

        getSingleService: builder.query<IService, string>({
            query: (id) => `/services/${id}`,
            transformResponse: (response: { data: IService }) => response.data,
            providesTags: (result, error, id) => [{ type: "Service", id }],
        }),

        createService: builder.mutation<IService, FormData>({
            query: (formData) => ({
                url: "/services",
                method: "POST",
                body: formData,
            }),
            transformResponse: (response: { data: IService }) => response.data,
            invalidatesTags: ["Service"],
        }),

        updateService: builder.mutation<IService, { id: string; formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `/services/${id}`,
                method: "PATCH",
                body: formData,
            }),
            transformResponse: (response: { data: IService }) => response.data,
            invalidatesTags: (result, error, { id }) => [{ type: "Service", id }, "Service"],
        }),

        deleteService: builder.mutation<IService, string>({
            query: (id) => ({
                url: `/services/${id}`,
                method: "DELETE",
            }),
            transformResponse: (response: { data: IService }) => response.data,
            invalidatesTags: ["Service"],
        }),
    }),
})

export const {
    useGetAllServicesQuery,
    useGetSingleServiceQuery,
    useCreateServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation,
} = serviceApi
