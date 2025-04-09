import { baseApi } from "../baseApi";

const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserAnalytics: builder.query({
      query: (email) => `/admin/analytics/users/bets?email=${email}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetUserAnalyticsQuery } = analyticsApi;
