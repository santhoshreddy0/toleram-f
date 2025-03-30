import { baseApi } from "../baseApi";

const betsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getmatch: builder.query({
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
        updatematchDetails: builder.mutation({
            query: (MatchData) => ({
                url: `/admin/match/${MatchData.matchId}`,
                method: 'PATCH',
                body: MatchData,
            }),
            invalidatesTags: ['match'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetmatchQuery,
    useGetMatchQuery,
    useGetMatchPlayersListQuery,
    useGetPlayerDetailsQuery,
    useGetPlayersQuery,
    useCreateMatchMutation,
    useAddMatchMutation,
    useUpdatematchDetailsMutation,
} = betsApi;
