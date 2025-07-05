// redux/api/bookApi.ts
import { baseApi } from "./baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Create Book
    createBook: builder.mutation({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["Book"],
    }),

    // ✅ Get all books
    getAllBooks: builder.query({
      query: () => "/books",
      providesTags: ["Book"],
    }),

    // ✅ Get book by ID
    getBookById: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Book", id }],
    }),

    // ✅ Update Book
    // updateBook: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/books/${id}`, // ✅ Matches backend
    //     method: "PUT",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Book", "Borrow"],
    // }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Book", { type: "BorrowSummary", id: "LIST" }],
    }),

    // ✅ Delete Book
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useCreateBookMutation,
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
