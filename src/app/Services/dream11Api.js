import { baseApi } from "./baseApi";

const dream11Api = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        createDream11Team: builder.mutation({
            query: ({ teamData }) => ({
              url: `dream11/createTeam`,
              method: "POST",
              body: teamData, 
            }),
            invalidatesTags: ["Players"],
          }),
    }),
    overrideExisting: false,
});

export const { useCreateDream11TeamMutation } = dream11Api;
