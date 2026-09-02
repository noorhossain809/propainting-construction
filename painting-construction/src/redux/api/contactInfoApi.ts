import { baseApi } from "./baseApi"

export interface IContactInfo {
    _id: string
    phoneOne: string
    phoneTwo?: string
    workingHours: string
    email: string
    location: string
    licenseNumber: string
    insuranceText: string
    createdAt: string
    updatedAt: string
}

const contactInfoApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getContactInfo: builder.query<IContactInfo, void>({
            query: () => "/contact-info",
            transformResponse: (response: { data: IContactInfo }) => response.data,
            providesTags: ["ContactInfo"],
        }),

        updateContactInfo: builder.mutation<IContactInfo, Partial<IContactInfo>>({
            query: (payload) => ({
                url: "/contact-info",
                method: "PATCH",
                body: payload,
            }),
            transformResponse: (response: { data: IContactInfo }) => response.data,
            invalidatesTags: ["ContactInfo"],
        }),
    }),
})

export const { useGetContactInfoQuery, useUpdateContactInfoMutation } = contactInfoApi
