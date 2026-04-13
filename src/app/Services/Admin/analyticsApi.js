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
    getBetActivityLogs: builder.query({
      query: ({ type, userId, refId }) => {
        const params = new URLSearchParams({ type, user_id: userId });
        if (refId != null) params.append("ref_id", refId);
        return `/admin/analytics/bet-activity-logs?${params.toString()}`;
      },
    }),
    clearLeaderboard: builder.mutation({
      query: () => ({
          url: `/admin/analytics/bets/dream11/leaderboard`,
          method: "DELETE"
      })
  }),
  }),

  overrideExisting: false,
});

export const {
  useGetUserAnalyticsQuery,
  useGetMatchBetAnalyticsQuery,
  useGetRoundBetAnalyticsQuery,
  useGetTournamenBetAnalyticsQuery,
  useGetBetActivityLogsQuery,
  useClearLeaderboardMutation,
} = analyticsApi;
