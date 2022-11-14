import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API = "https://pf-henry-05.onrender.com";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  tagTypes: ["Posts", "PostId"],

  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ order, type }) => {
        if (!order || !type) return "/posts";
        return `/posts/sort?order=${order}&type=${type}`;
      },
      providesTags: ["Posts"],
    }),

    getPostById: builder.query({
      query: (postId) => `/posts/${postId}`,
      providesTags: ["PostId"]
    }),

    addNewPost: builder.mutation({
      query: (newPost) => ({
        url: "/posts",
        method: "post",
        body: newPost,
      }),
      invalidatesTags: ["Posts"],
    }),

    addNewComment: builder.mutation({
      query: (comment) => ({
        url: "/comments",
        method: "post",
        body: comment,
      }),
      invalidatesTags: ["PostId"],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Posts"],
    }),

    updatePost: builder.mutation({
      query: (post) => ({
        url: `/posts/`,
        method: "put",
        body: post,
      }),
      invalidatesTags: ["Posts"],
    }),

    updatePostLikes: builder.mutation({
      query: (post) => ({
        url: `/posts/updateLikes`,
        method: "put",
        body: post,
      }),
      invalidatesTags: ["Posts", "PostId"],
    }),


    deleteComment: builder.mutation({
        query: (id) => ({
            url: `/comments/${id}`,
            method: 'delete',
        }),
        invalidatesTags: ["PostId"]
    })


  }),
});

export const {
  useGetPostsQuery,
  useAddNewPostMutation,
  useLazyGetPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
  useGetPostByIdQuery,
  useDeleteCommentMutation,
  useAddNewCommentMutation,
  useUpdatePostLikesMutation
} = postApi;
