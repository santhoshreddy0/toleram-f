import { baseApi } from "./baseApi";

const betsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRounds: builder.query({
            query: () => `/rounds`,
        }),
        getRoundById: builder.query({
            query: (roundId) => `/rounds/${roundId}`,
        }),
        getRoundQuestions: builder.query({
            query: (roundId) => `/rounds/${roundId}/questions`,
        }),
        getRoundBets: builder.query({
            query: (roundId) => `/rounds/${roundId}/bets`,
            providesTags: (result, error, arg) => {
                return ["RoundBets"];
            },
        }),
        updateRoundBets: builder.mutation({
            query: (roundId, data) => ({
                url: `/rounds/${roundId}/bets`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["RoundBets"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetRoundsQuery,
    useGetRoundByIdQuery,
    useGetRoundQuestionsQuery,
    useGetRoundBetsQuery,
    useUpdateRoundBetsMutation,
} = betsApi;
