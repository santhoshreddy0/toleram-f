import { baseApi } from "./baseApi";

const commentsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getRoom: builder.query({
            query: (roomName) => `/rooms/${roomName}`,
            providesTags: (result, error, arg) => ['Room'],
        }),
    }),
    overrideExisting: false,
});

export const {useGetRoomQuery} = commentsApi;
