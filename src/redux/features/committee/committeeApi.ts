import { baseApi } from "../../api/baseApi";

const committeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCommittee: builder.mutation({
      query: (committeeData) => {
        return {
          url: "/committee/create",
          method: "POST",
          body: committeeData,
        };
      },
      invalidatesTags: ["Committee"],
    }),
    getAllCommittees: builder.query({
      query: () => {
        return {
          url: "/committee/get-all",
          method: "GET",
        };
      },
      providesTags: ["Committee"],
    }),
    getCommitteeById: builder.query({
      query: (id) => ({
        url: `/committee/${id}`,
        method: "GET",
      }),
      providesTags: ["Committee"],
    }),
    updateCommittee: builder.mutation({
      query: ({ id, updateData }) => ({
        url: `/committee/update/${id}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: ["Committee"],
    }),
    deleteCommittee: builder.mutation({
      query: (id) => ({
        url: `/committee/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Committee"],
    }),
  }),
});

export const {
  useCreateCommitteeMutation,
  useGetAllCommitteesQuery,
  useGetCommitteeByIdQuery,
  useUpdateCommitteeMutation,
  useDeleteCommitteeMutation,
} = committeeApi;
