import { baseApi } from "./baseApi"

export interface IHeroSlide {
    _id: string
    badgeText?: string
    title: string
    subtitle?: string
    mediaType: "image" | "video"
    backgroundImage?: {
        url: string
        alt: string
    }
    videoUrl?: string
    primaryButtonText?: string
    primaryButtonLink?: string
    secondaryButtonText?: string
    secondaryButtonLink?: string
    order: number
    isActive: boolean
    createdAt: string
    updatedAt: string
}

const heroSlideApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllHeroSlides: builder.query<IHeroSlide[], void>({
            query: () => "/hero-slides",
            transformResponse: (response: { data: IHeroSlide[] }) => response.data,
            providesTags: ["HeroSlide"],
        }),

        getSingleHeroSlide: builder.query<IHeroSlide, string>({
            query: (id) => `/hero-slides/${id}`,
            transformResponse: (response: { data: IHeroSlide }) => response.data,
            providesTags: (result, error, id) => [{ type: "HeroSlide", id }],
        }),

        createHeroSlide: builder.mutation<IHeroSlide, FormData>({
            query: (formData) => ({
                url: "/hero-slides",
                method: "POST",
                body: formData,
            }),
            transformResponse: (response: { data: IHeroSlide }) => response.data,
            invalidatesTags: ["HeroSlide"],
        }),

        updateHeroSlide: builder.mutation<IHeroSlide, { id: string; formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `/hero-slides/${id}`,
                method: "PATCH",
                body: formData,
            }),
            transformResponse: (response: { data: IHeroSlide }) => response.data,
            invalidatesTags: (result, error, { id }) => [{ type: "HeroSlide", id }, "HeroSlide"],
        }),

        deleteHeroSlide: builder.mutation<IHeroSlide, string>({
            query: (id) => ({
                url: `/hero-slides/${id}`,
                method: "DELETE",
            }),
            transformResponse: (response: { data: IHeroSlide }) => response.data,
            invalidatesTags: ["HeroSlide"],
        }),
    }),
})

export const {
    useGetAllHeroSlidesQuery,
    useGetSingleHeroSlideQuery,
    useCreateHeroSlideMutation,
    useUpdateHeroSlideMutation,
    useDeleteHeroSlideMutation,
} = heroSlideApi
