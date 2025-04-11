import { baseApi } from "../../api/baseApi";

const eventApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addEvent: builder.mutation({
      query: (eventData) => ({
        url: "/event/create",
        method: "POST",
        body: eventData,
      }),
      invalidatesTags: ["event"],
    }),
    getAllEvents: builder.query({
      query: () => ({
        url: "/event/get-all",
        method: "GET",
      }),
      providesTags: ["event"],
    }),
    getSingleEvent: builder.query({
      query: (id) => ({
        url: `/event/get-single/${id}`,
        method: "GET",
      }),
      providesTags: ["event"],
    }),
    updateEvent: builder.mutation({
      query: ({ id, eventData }) => ({
        url: `/event/update/${id}`,
        method: "PUT",
        body: eventData,
      }),
      invalidatesTags: ["event"],
    }),
    deleteEvent: builder.mutation({
      query: (id) => ({
        url: `/event/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["event"],
    }),
  }),
});

export const {
  useAddEventMutation,
  useGetAllEventsQuery,
  useGetSingleEventQuery,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventApi;
