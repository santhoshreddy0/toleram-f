import { baseApi } from './baseApi';

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        verifyToken: builder.mutation({
            query: (token) => ({
                url: '/auth/verify',
                method: 'POST',
                body: { token },
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useLoginMutation,
    useVerifyTokenMutation,
} = authApi;
