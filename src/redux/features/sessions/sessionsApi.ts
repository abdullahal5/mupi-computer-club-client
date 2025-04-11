import { baseApi } from "../../api/baseApi";

const sessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSession: builder.mutation({
      query: (sessionData) => ({
        url: "/session/create",
        method: "POST",
        body: sessionData,
      }),
      invalidatesTags: ["session"],
    }),
    getAllSessions: builder.query({
      query: () => ({
        url: "/session/get-all",
        method: "GET",
      }),
      providesTags: ["session"],
    }),
    getSingleSession: builder.query({
      query: (id) => ({
        url: `/session/get-single/${id}`,
        method: "GET",
      }),
      providesTags: ["session"],
    }),
    updateSession: builder.mutation({
      query: ({ id, sessionData }) => ({
        url: `/session/update/${id}`,
        method: "PUT",
        body: sessionData,
      }),
      invalidatesTags: ["session"],
    }),
    deleteSession: builder.mutation({
      query: (id) => ({
        url: `/session/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["session"],
    }),
  }),
});

export const {
  useAddSessionMutation,
  useGetAllSessionsQuery,
  useGetSingleSessionQuery,
  useUpdateSessionMutation,
  useDeleteSessionMutation,
} = sessionApi;
