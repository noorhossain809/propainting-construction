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

export interface IContactMessagePayload {
    name: string
    phone: string
    email: string
    projectType: string
    projectDetails?: string
}

const contactMessageApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Public: submit the quote/contact form
        createContactMessage: builder.mutation<IContactMessage, IContactMessagePayload>({
            query: (payload) => ({
                url: "/contact-message",
                method: "POST",
                body: payload,
            }),
            transformResponse: (response: { data: IContactMessage }) => response.data,
            invalidatesTags: ["ContactMessage"],
        }),

        // Admin: list submitted messages
        getAllContactMessages: builder.query<IContactMessage[], void>({
            query: () => "/contact-message",
            transformResponse: (response: { data: IContactMessage[] }) => response.data,
            providesTags: ["ContactMessage"],
        }),
    }),
})

export const {
    useCreateContactMessageMutation,
    useGetAllContactMessagesQuery,
} = contactMessageApi
