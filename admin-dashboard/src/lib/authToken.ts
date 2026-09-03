// Client-side auth token stored in a (non-httpOnly) cookie on the admin app's
// own domain. The Next middleware reads it to gate routes, and baseApi reads it
// to send an Authorization: Bearer header — so auth works even when the API is
// hosted on a different domain than this admin app.

const TOKEN_KEY = "accessToken"
const MAX_AGE = 7 * 24 * 60 * 60 // 7 days, matches the backend cookie

export const setAuthToken = (token: string): void => {
    if (typeof document === "undefined") return
    const secure = window.location.protocol === "https:" ? "; secure" : ""
    document.cookie = `${TOKEN_KEY}=${encodeURIComponent(
        token
    )}; path=/; max-age=${MAX_AGE}; samesite=lax${secure}`
}

export const clearAuthToken = (): void => {
    if (typeof document === "undefined") return
    document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; samesite=lax`
}
