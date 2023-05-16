import { baseApi } from './baseApi';

const betsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRounds: builder.query({
            query: () => `/rounds`
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetRoundsQuery
} = betsApi;
