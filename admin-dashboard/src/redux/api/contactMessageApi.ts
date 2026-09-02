import { baseApi } from "./baseApi"

export interface IContactMessage {
    _id: string
    name: string
    phone: string
    email: string
    projectType: string
    projectDetails?: string
    status: "new" | "read" | "archived"
    createdAt: string
    updatedAt: string
}

const contactMessageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllContactMessages: builder.query<IContactMessage[], void>({
            query: () => "/contact-message",
            transformResponse: (response: { data: IContactMessage[] }) => response.data,
            providesTags: ["ContactMessage"],
        }),

        updateContactMessageStatus: builder.mutation<
            IContactMessage,
            { id: string; status: IContactMessage["status"] }
        >({
            query: ({ id, status }) => ({
                url: `/contact-message/${id}`,
                method: "PATCH",
                body: { status },
            }),
            transformResponse: (response: { data: IContactMessage }) => response.data,
            invalidatesTags: ["ContactMessage"],
        }),

        deleteContactMessage: builder.mutation<IContactMessage, string>({
            query: (id) => ({
                url: `/contact-message/${id}`,
                method: "DELETE",
            }),
            transformResponse: (response: { data: IContactMessage }) => response.data,
            invalidatesTags: ["ContactMessage"],
        }),
    }),
})

export const {
    useGetAllContactMessagesQuery,
    useUpdateContactMessageStatusMutation,
    useDeleteContactMessageMutation,
} = contactMessageApi
