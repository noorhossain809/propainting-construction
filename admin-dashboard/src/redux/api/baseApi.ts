import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
        // যদি cookie-based auth থাকে (তোমার backend-এ cookieParser দেখলাম)
        credentials: "include",
    }),
    tagTypes: ["Project", "Service", "HeroSlide", "ContactInfo", "Team", "ContactMessage"],
    endpoints: () => ({}),
})