import { baseApi } from "./baseApi";

const betHistoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBetHistory: builder.query({
      query: () => `/history`,
      providesTags: (result, error, arg) => {
        return ["History"];
      },
    }),
    getBetHistoryByMatchId: builder.query({
      query: (matchId) => `/history/matches/${matchId}`,
      providesTags: (result, error, arg) => {
        return ["History"];
      },
    }),
    getBetHistoryByRoundId: builder.query({
      query: (roundId) => `/history/rounds/${roundId}`,
      providesTags: (result, error, arg) => {
        return ["History"];
      },
    }),
    getBetHistoryOfBestPlayers: builder.query({
      query: () => `/history/bestplayers`,
      providesTags: (result, error, arg) => {
        return ["History"];
      },
    }),
    getRewards: builder.query({
      query: () => `/history/rewards`,
      providesTags: (result, error, arg) => {
        return ["History"];
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBetHistoryQuery,
  useGetBetHistoryByMatchIdQuery,
  useGetBetHistoryByRoundIdQuery,
  useGetBetHistoryOfBestPlayersQuery,
  useGetRewardsQuery,
} = betHistoryApi;
