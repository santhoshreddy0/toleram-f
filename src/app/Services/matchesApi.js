import { baseApi } from './baseApi';

const betsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMatches: builder.query({
            query: () => `/matches`,
            providesTags: (result, error, arg) => {
                return ["matches"];
            },
        }),
        getMatchQuestions: builder.query({
            query: (matchId) => `/matches/${matchId}/questions`,
            providesTags: (result, error, arg) => {
                return ["questiosn"];
            },
        }),
        getMatchBets: builder.query({
            query: (matchId) => `/matches/${matchId}/bets`,
            providesTags: (result, error, arg) => {
                return ["MatchBets"];
            },
        }),
        updateMatchBets: builder.mutation({
            query: (matchId, data) => ({
                url: `/matches/${matchId}/bets`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["MatchBets"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetMatchesQuery
} = betsApi;
