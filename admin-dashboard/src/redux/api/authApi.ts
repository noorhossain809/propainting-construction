import { baseApi } from "./baseApi";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string; user: IUser },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: { data: { token: string; user: IUser } }) =>
        response.data,
    }),

    googleLogin: builder.mutation<
      { token: string; user: IUser },
      { idToken: string }
    >({
      query: (payload) => ({
        url: "/auth/google",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: { data: { token: string; user: IUser } }) =>
        response.data,
    }),

    logout: builder.mutation<null, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    getMe: builder.query<IUser, void>({
      query: () => "/auth/me",
      transformResponse: (response: { data: IUser }) => response.data,
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetMeQuery, useGoogleLoginMutation } = authApi;
