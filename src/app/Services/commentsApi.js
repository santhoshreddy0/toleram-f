import { baseApi } from "./baseApi";

const commentsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getComments: builder.query({
            query: ({ roomId, token }) => {
                let url = `/comments/rooms/${roomId}`;
                if (token) {
                    url += `?token=${token}`;
                }
                return { url };
            },
            providesTags: (result, error, arg) => ['Comments'],
        }),

        postComment: builder.mutation({
            query: ({ roomId, commentData }) => ({
                url: `/comments/rooms/${roomId}`,
                method: 'POST',
                body: commentData,
            }),
            invalidatesTags: ['Comments'],
        }),
    }),
    overrideExisting: false,
});

export const { usePostCommentMutation , useGetCommentsQuery} = commentsApi;
