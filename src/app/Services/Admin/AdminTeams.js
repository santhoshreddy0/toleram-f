import { baseApi } from "../baseApi";

const betsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: () => `/teams`,
      providesTags: (result, error, arg) => {
        return ["teams"];
      },
    }),
    getTeam: builder.query({
      query: (teamId) => `/teams/${teamId}`,
      providesTags: (result, error, arg) => {
        return ["team"];
      },
    }),
    getTeamPlayersList: builder.query({
      query: (teamId) => `/teams/${teamId}/players`,
      providesTags: (result, error, arg) => {
        return ["players"];
      },
    }),
    getTeamPlayers: builder.query({
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
    createTeam: builder.mutation({
      query: ({ teamName, imageUrl }) => ({
        url: "/admin/teams",
        method: "POST",
        body: {
          name: teamName,
          imageUrl: imageUrl,
        },
      }),
      invalidatesTags: ["teams"],
    }),
    addPlayerToTeam: builder.mutation({
      query: (playerData) => ({
        url: `/admin/teams/${playerData.teamId}`,
        method: "POST",
        body: playerData,
      }),
      invalidatesTags: ["players"],
    }),
    updateTeamsDetails: builder.mutation({
      query: ({ name, imageUrl, teamId }) => ({
        url: `/admin/teams/${teamId}`,
        method: "PATCH",
        body: {
          name,
          imageUrl: imageUrl && imageUrl,
        },
      }),
      invalidatesTags: ["teams"],
    }),
    addImageUrl: builder.mutation({
      query: (imageData) => ({
        url: `/media/generate-presigned-url`,
        method: "POST",
        body: imageData,
      }),
      invalidatesTags: ["teams"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTeamsQuery,
  useGetTeamQuery,
  useGetTeamPlayersListQuery,
  useGetPlayerDetailsQuery,
  useGetTeamPlayers,
  useCreateTeamMutation,
  useAddPlayerToTeamMutation,
  useUpdateTeamsDetailsMutation,
  useAddImageUrlMutation,
} = betsApi;
