import { baseApi } from "./baseApi";

const betHistoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBetHistory: builder.query({
      query: () => `/history`,
      providesTags: (result, error, arg) => {
        return ["history"];
      },
    }),
    getBetHistoryByMatchId: builder.query({
      query: (matchId) => `/history/matches/${matchId}`,
      providesTags: (result, error, arg) => {
        return ["history"];
      },
    }),
    getBetHistoryByRoundId: builder.query({
      query: (roundId) => `/history/rounds/${roundId}`,
      providesTags: (result, error, arg) => {
        return ["history"];
      },
    }),
    getBetHistoryOfBestPlayers: builder.query({
      query: () => `/history/bestplayers`,
      providesTags: (result, error, arg) => {
        return ["history"];
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
} = betHistoryApi;
