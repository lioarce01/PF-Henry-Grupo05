import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API = process.env.REACT_APP_API || "http://localhost:3001";

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
      providesTags: ["PostId"],
    }),

    addNewPost: builder.mutation({
      query: ({ accessToken, newPost }) => ({
        url: "/posts",
        method: "post",
        body: newPost,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ["Posts"],
    }),

    addNewComment: builder.mutation({
      query: ({ accessToken, comment }) => ({
        url: "/comments",
        method: "post",
        body: comment,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ["PostId", "Posts"],
    }),
    updateComment: builder.mutation({
      query: ({ accessToken, comment }) => ({
        url: "/comments",
        method: "put",
        body: comment,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ["PostId", "Posts"],
    }),

    deletePost: builder.mutation({
      query: ({ accessToken, id }) => ({
        url: `/posts/${id}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ["Posts"],
    }),

    updatePost: builder.mutation({
      query: ({ accessToken, post }) => ({
        url: `/posts/`,
        method: "put",
        body: post,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ["Posts", "PostId"],
    }),

    updatePostLikes: builder.mutation({
      query: ({ accessToken, post }) => ({
        url: `/posts/updateLikes`,
        method: "put",
        body: post,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: [],
    }),

    deleteComment: builder.mutation({
      query: ({ accessToken, id }) => {
        return {
          url: `/comments/${id}`,
          method: "delete",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["PostId", "Posts"],
    }),
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
  useUpdatePostLikesMutation,
  useUpdateCommentMutation
} = postApi;
