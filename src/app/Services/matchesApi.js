import { baseApi } from './baseApi';

const betsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMatches: builder.query({
            query: () => `/matches`,
            providesTags: (result, error, arg) => {
                return ["matches"];
            },
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetMatchesQuery
} = betsApi;
