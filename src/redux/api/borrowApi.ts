import baseApi from "./baseApi";

export const borrowApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Borrow Book
    borrowBook: builder.mutation({
      query: (data) => ({
        url: "/borrow",
        method: "POST",
        body: data,
      }),
      // Invalidate "Borrow" list and associated book cache
      invalidatesTags: [{ type: "BorrowSummary", id: "LIST" }, "Book"],
    }),

    // ✅ Get Borrow Summary
    // getBorrowSummary: builder.query({
    //   query: () => "/borrow",
    //   providesTags: ["Borrow"],
    // }),
    getBorrowSummary: builder.query({
      query: () => "/borrow",
      providesTags: [{ type: "BorrowSummary", id: "LIST" }],
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowSummaryQuery } = borrowApi;
