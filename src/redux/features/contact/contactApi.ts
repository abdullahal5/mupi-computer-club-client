import { baseApi } from "../../api/baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendEmail: builder.mutation({
      query: (contactData) => {
        return {
          url: "/contact/send-email",
          method: "POST",
          body: contactData,
        };
      },
      invalidatesTags: ["contact"],
    }),
  }),
});

export const {
  useSendEmailMutation,
} = contactApi;
