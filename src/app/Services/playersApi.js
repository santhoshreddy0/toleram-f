import { baseApi } from "./baseApi";

const betsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPlayerQuestions: builder.query({
            query: () => `bestplayers/questions`,
            providesTags: (result, error, arg) => {
                return ["Players"];
            },
        }),
        getPlayersBets: builder.query({
            query: () => `bestplayers/bets`,
            providesTags: (result, error, arg) => {
                return ["PlayersBets"];
            },
        }),
        updatePlayerBets: builder.mutation({
            query: ({ data }) => ({
                url: `bestplayers/bets`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["PlayersBets", "History"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetPlayerQuestionsQuery,
    useGetPlayersBetsQuery,
    useUpdatePlayerBetsMutation,
} = betsApi;
