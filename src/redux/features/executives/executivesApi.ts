import { baseApi } from "../../api/baseApi";

const executivesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addExecutive: builder.mutation({
      query: (executiveData) => ({
        url: "/executives/create",
        method: "POST",
        body: executiveData,
      }),
      invalidatesTags: ["executives"],
    }),
    getAllExecutives: builder.query({
      query: ({ session, roleType }) => ({
        url: "/executives/get-all",
        method: "GET",
        params: { session, roleType },
      }),
      providesTags: ["executives"],
    }),
    getSingleExecutive: builder.query({
      query: (id) => ({
        url: `/executives/get-single/${id}`,
        method: "GET",
      }),
      providesTags: ["executives"],
    }),
    updateExecutive: builder.mutation({
      query: ({ id, executiveData }) => ({
        url: `/executives/update/${id}`,
        method: "PUT",
        body: executiveData,
      }),
      invalidatesTags: ["executives"],
    }),
    deleteExecutive: builder.mutation({
      query: (id) => ({
        url: `/executives/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["executives"],
    }),
  }),
});

export const {
  useAddExecutiveMutation,
  useGetAllExecutivesQuery,
  useGetSingleExecutiveQuery,
  useUpdateExecutiveMutation,
  useDeleteExecutiveMutation,
} = executivesApi;
