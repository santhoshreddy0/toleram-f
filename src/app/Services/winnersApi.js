import { baseApi } from './baseApi';

const betsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createWinnersBets: builder.mutation({
            query: (data) => ({
                url: `/winners/${data.round_id}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => {
                return ["Rounds"];
            },
        }),
        updateWinnersBets: builder.mutation({
            query: (data) => ({
                url: `/winners/${data.round_id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, arg) => {
                return ["Rounds"];
            },
        }),
        getWinnersBets: builder.query({
            query: () => `/winners`,
            providesTags: (result, error, arg) => {
                return ["Rounds"];
            },
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateWinnersBetsMutation,
    useUpdateWinnersBetsMutation,
    useGetWinnersBetsQuery
} = betsApi;
