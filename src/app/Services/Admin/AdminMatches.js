import { baseApi } from "../baseApi";

const betsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getmatches: builder.query({
            query: () => `/matches`,
            providesTags: (result, error, arg) => {
                return ["match"];
            },
        }),
        getMatch: builder.query({
            query: (matchId) => `/Matches/${matchId}`,
            providesTags: (result, error, arg) => {
                return ["Match"];
            },
        }),
        getMatchPlayersList: builder.query({
            query: (matchId) => `/Matches/${matchId}/players`,
            providesTags: (result, error, arg) => {
                return ["players"];
            },
        }),
        getMatchPlayers: builder.query({
            query: () => `/players`,
            providesTags: (result, error, arg) => {
                return ["players"];
            },
        }),
        getPlayerDetails: builder.query({
            query: (playrId) => `/players/${playrId}`,
            providesTags: (result, error, arg) => {
                return ["players"];
            },
        }),
        createMatch: builder.mutation({
            query: (MatchData) => ({
                url: '/admin/match',
                method: 'POST',
                body: MatchData,
            }),
            invalidatesTags: ['match'],
        }),
        addMatch: builder.mutation({
            query: (playerData) => ({
                url: `/admin/Matches`,
                method: 'POST',
                body: playerData,
            }),
            invalidatesTags: ['match'],
        }),
        updateMatchDetails: builder.mutation({
            query: (MatchData) => ({
                url: `/admin/matches/${MatchData.id}`,
                method: 'PATCH',
                body: MatchData,
            }),
            invalidatesTags: ['player'],
        }),
        getAdminQuestions: builder.query({
            query: (matchId) => `/admin/matches/${matchId}/questions`,
            providesTags: (result, error, arg) => {
                return ["question"];
            },
        }),
        addQuestion: builder.mutation({
            query: (matchData) => ({
                url: `/admin/matches/${matchData.matchId}/addQuestion`,
                method: 'POST',
                body: matchData,
            }),
            invalidatesTags: ['matches'],
        }),
        updateQuestion: builder.mutation({
            query: (questionsData) => ({
                url: `/admin/questions/${questionsData.id}`,
                method: 'PATCH',
                body: questionsData,
            }),
           invalidatesTags: (result, error, arg) => [{ type: 'question', id: arg.id }],
        }),
        updateCorrectAnswer: builder.mutation({
            query: (questionsData) => ({
                url: `/admin/questions/${questionsData.questionId}/correctOption`,
                method: 'PATCH',
                body: questionsData,
            }),
           invalidatesTags: (result, error, arg) => [{ type: 'question', id: arg.id }],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetmatchesQuery,
    useGetMatchQuery,
    useGetMatchPlayersListQuery,
    useGetPlayerDetailsQuery,
    useGetPlayersQuery,
    useCreateMatchMutation,
    useAddMatchMutation,
    useUpdateMatchDetailsMutation,
    useGetAdminQuestionsQuery,
    useAddQuestionMutation,
    useUpdateQuestionMutation,
    useUpdateCorrectAnswerMutation
} = betsApi;
