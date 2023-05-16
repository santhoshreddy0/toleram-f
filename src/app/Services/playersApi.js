import { baseApi } from './baseApi';

const betsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPlayersBets: builder.mutation({
            query: (data) => ({
                url: `/players`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => {
                return ["Players"];
            },
        }),
        updatePlayersBets: builder.mutation({
            query: (data) => ({
                url: `players`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => {
                return ["Players"];
            },
        }),
        getPlayersBets: builder.query({
            query: () => `players`,
            providesTags: (result, error, arg) => {
                return ["Players"];
            },
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreatePlayersBetsMutation,
    useUpdatePlayersBetsMutation,
    useGetPlayersBetsQuery
} = betsApi;
