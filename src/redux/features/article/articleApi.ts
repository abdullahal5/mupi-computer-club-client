import { baseApi } from "../../api/baseApi";

const articleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addArticle: builder.mutation({
      query: (articleData) => {
        return {
          url: "/article/create",
          method: "POST",
          body: articleData,
        };
      },
      invalidatesTags: ["article"],
    }),
    getAllArticle: builder.query({
      query: () => {
        return {
          url: "/article/get-all",
          method: "GET",
        };
      },
      providesTags: ["article"],
    }),
    getSingleArticle: builder.query({
      query: (id) => {
        return {
          url: `/article/get-single/${id}`,
          method: "GET",
        };
      },
      providesTags: ["article"],
    }),
    updateArticle: builder.mutation({
      query: ({ id, updateData }) => ({
        url: `/article/update/${id}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["article"],
    }),
    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `/article/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["article"],
    }),
  }),
});

export const {
  useAddArticleMutation,
  useGetAllArticleQuery,
  useGetSingleArticleQuery,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articleApi;
