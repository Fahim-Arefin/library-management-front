import App from "@/App";
import BookList from "@/pages/BookList";
import CreateBook from "@/pages/CreateBook";
import BookDetails from "@/pages/BookDetails";

import { createBrowserRouter } from "react-router";
import EditBook from "@/pages/EditBook";
import BorrowSummaryPage from "@/pages/BorrowSummaryPage";
import HomePage from "@/pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // ✅ This handles the root path "/"
        element: <HomePage />, // Ensure you have a HomePage component
      },
      {
        path: "books", // ✅ No slash needed
        element: <BookList />,
      },
      { path: "books/:id", element: <BookDetails /> },

      {
        path: "create-book",
        element: <CreateBook />,
      },
      { path: "edit-book/:id", element: <EditBook /> },
      { path: "borrow-summary", element: <BorrowSummaryPage /> },
    ],
  },
]);

export default router;
