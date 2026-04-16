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
        verifyToken: builder.query({
            query: () => '/auth/verify',
        }),
    }),
    overrideExisting: false,
});

export const {
    useLoginMutation,
    useVerifyTokenQuery,
} = authApi;
