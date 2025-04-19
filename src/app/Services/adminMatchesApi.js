import { baseApi } from "./baseApi";

const matchesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addMatch: builder.mutation({
            query: (data) => ({
                url: `/admin/matches`,
                method: "POST",
                body: data.matchData,
            }),
            invalidatesTags: ["matches"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useAddMatchMutation
} = matchesApi;
