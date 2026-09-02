import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
        // cookie-based auth (backend uses cookieParser)
        credentials: "include",
    }),
    tagTypes: ["Project", "Service", "HeroSlide", "ContactInfo", "Team", "ContactMessage"],
    endpoints: () => ({}),
})
