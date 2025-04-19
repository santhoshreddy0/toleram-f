import { baseApi } from "../baseApi";

const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserAnalytics: builder.query({
      query: (email) => `/admin/analytics/users/bets?email=${email}`,
    }),
    getMatchBetAnalytics: builder.query({
      query: (matchId) => `/admin/analytics/match/bets`,
    }),
    getRoundBetAnalytics: builder.query({
      query: (roundId) => `/admin/analytics/round/bets`,
    }),
    getTournamenBetAnalytics: builder.query({
      query: (tournamentId) => `/admin/analytics/bets`,
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetUserAnalyticsQuery,
  useGetMatchBetAnalyticsQuery,
  useGetRoundBetAnalyticsQuery,
  useGetTournamenBetAnalyticsQuery,
} = analyticsApi;
