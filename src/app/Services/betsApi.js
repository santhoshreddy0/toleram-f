import { baseApi } from './baseApi';

const betsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBets: builder.mutation({
            query: (data) => ({
                url: `/userbets/${data.matchId}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => {
                return ["Bets"];
            },
        }),
        updateBets: builder.mutation({
            query: (data) => ({
                url: `/userbets/${data.matchId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => {
                return ["Bets"];
            },
        }),
        getBets: builder.query({
            query: () => `/userbets`,
            providesTags: (result, error, arg) => {
                return ["Bets"];
            },
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateBetsMutation,
    useUpdateBetsMutation,
    useGetBetsQuery
} = betsApi;
