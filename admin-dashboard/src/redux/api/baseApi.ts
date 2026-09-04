import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Read a cookie value in the browser (used to attach the auth token as a
// Bearer header, so auth works even when the API is on a different domain
// than the admin app and the httpOnly cookie can't be shared cross-site).
const getCookie = (name: string): string | undefined => {
    if (typeof document === "undefined") return undefined
    const match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"))
    return match ? decodeURIComponent(match[1]) : undefined
}

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
        // cookie-based auth (the backend uses cookieParser)
        credentials: "include",
        prepareHeaders: (headers) => {
            const token = getCookie("accessToken")
            if (token) {
                headers.set("authorization", `Bearer ${token}`)
            }
            return headers
        },
    }),
    tagTypes: ["Project", "Service", "HeroSlide", "ContactInfo", "Team", "ContactMessage"],
    endpoints: () => ({}),
})
