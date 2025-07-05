// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { toast } from "sonner";
// import { useNavigate } from "react-router";
// import { Pencil, Trash2, BookOpen, Eye } from "lucide-react";
// import {
//   useDeleteBookMutation,
//   useGetAllBooksQuery,
// } from "@/redux/api/bookApi";

// export default function BookList() {
//   const navigate = useNavigate();
//   const { data, isLoading, isError } = useGetAllBooksQuery(undefined);
//   const [deleteBook] = useDeleteBookMutation();

//   const [openDialogId, setOpenDialogId] = useState<string | null>(null);

//   const handleDelete = async (id: string) => {
//     try {
//       await deleteBook(id).unwrap();
//       toast.success("Book deleted successfully");
//     } catch (err) {
//       console.log(err);
//       toast.error("Failed to delete book");
//     } finally {
//       setOpenDialogId(null);
//     }
//   };

//   if (isLoading) return <p className="text-center mt-8">Loading books...</p>;
//   if (isError)
//     return <p className="text-center text-red-500">Failed to load books</p>;

//   return (
//     <div className="max-w-7xl mx-auto px-4 mt-10">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold text-gray-800">📚 Book List</h1>
//         <Button onClick={() => navigate("/create-book")}>+ Add New Book</Button>
//       </div>

//       <div className="overflow-x-auto rounded-lg border shadow-sm overflow-y-auto max-h-[700px]">
//         <table className="min-w-full text-sm text-left">
//           <thead className="bg-muted text-muted-foreground">
//             <tr>
//               <th className="px-4 py-3">Title</th>
//               <th className="px-4 py-3">Author</th>
//               <th className="px-4 py-3">Genre</th>
//               <th className="px-4 py-3">ISBN</th>
//               <th className="px-4 py-3">Copies</th>
//               <th className="px-4 py-3">Available</th>
//               <th className="px-4 py-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data?.data?.map((book: any) => (
//               <tr
//                 key={book._id}
//                 className="border-t hover:bg-accent/30 cursor-pointer"
//                 onClick={() => navigate(`/books/${book._id}`)}
//               >
//                 <td className="px-4 py-3 font-medium text-gray-900">
//                   {book.title}
//                 </td>
//                 <td className="px-4 py-3">{book.author}</td>
//                 <td className="px-4 py-3">{book.genre}</td>
//                 <td className="px-4 py-3">{book.isbn}</td>
//                 <td className="px-4 py-3">{book.copies}</td>
//                 <td className="px-4 py-3">
//                   {book.available ? (
//                     <span className="text-green-600 font-semibold">Yes</span>
//                   ) : (
//                     <span className="text-red-500 font-semibold">No</span>
//                   )}
//                 </td>
//                 <td
//                   className="px-4 py-3 space-x-2 flex items-center"
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   <Button
//                     className="cursor-pointer"
//                     size="icon"
//                     variant="outline"
//                     onClick={() => navigate(`/books/${book._id}`)}
//                   >
//                     <Eye className="w-4 h-4" />
//                   </Button>

//                   <Button
//                     className="cursor-pointer"
//                     size="icon"
//                     variant="outline"
//                     onClick={() => navigate(`/edit-book/${book._id}`)}
//                   >
//                     <Pencil className="w-4 h-4" />
//                   </Button>

//                   <Dialog
//                     open={openDialogId === book._id}
//                     onOpenChange={(open) =>
//                       setOpenDialogId(open ? book._id : null)
//                     }
//                   >
//                     <DialogTrigger asChild>
//                       <Button
//                         size="icon"
//                         variant="destructive"
//                         className="cursor-pointer"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </Button>
//                     </DialogTrigger>
//                     <DialogContent>
//                       <DialogHeader>
//                         <DialogTitle>Are you sure?</DialogTitle>
//                       </DialogHeader>
//                       <p>
//                         This will permanently delete{" "}
//                         <strong>{book.title}</strong>.
//                       </p>
//                       <DialogFooter>
//                         <Button
//                           variant="outline"
//                           onClick={() => setOpenDialogId(null)}
//                         >
//                           Cancel
//                         </Button>
//                         <Button
//                           variant="destructive"
//                           onClick={() => handleDelete(book._id)}
//                         >
//                           Delete
//                         </Button>
//                       </DialogFooter>
//                     </DialogContent>
//                   </Dialog>

//                   <Button
//                     className="cursor-pointer"
//                     size="icon"
//                     variant="secondary"
//                     onClick={() => navigate(`/borrow/${book._id}`)}
//                   >
//                     <BookOpen className="w-4 h-4" />
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Pencil, Trash2, BookOpen, Eye } from "lucide-react";
import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
} from "@/redux/api/bookApi";
import { useBorrowBookMutation } from "@/redux/api/borrowApi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BookList() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAllBooksQuery(undefined);
  const [deleteBook] = useDeleteBookMutation();
  const [borrowBook] = useBorrowBookMutation();

  const [openDialogId, setOpenDialogId] = useState<string | null>(null);
  const [borrowForm, setBorrowForm] = useState({
    bookId: "",
    quantity: 1,
    dueDate: "",
  });

  const [borrowModalId, setBorrowModalId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id).unwrap();
      toast.success("Book deleted successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete book");
    } finally {
      setOpenDialogId(null);
    }
  };

  const handleBorrow = async () => {
    try {
      await borrowBook({
        book: borrowForm.bookId,
        quantity: Number(borrowForm.quantity),
        dueDate: borrowForm.dueDate,
      }).unwrap();
      toast.success("Book borrowed successfully");
      setBorrowModalId(null);
      setBorrowForm({ bookId: "", quantity: 1, dueDate: "" });
      navigate("/borrow-summary");
    } catch (error: any) {
      const message =
        error?.data?.error?.issues?.[0]?.message ||
        error?.data?.error?.[0]?.message ||
        error?.data?.message ||
        "Failed to borrow book.";
      toast.error(message);
    }
  };

  if (isLoading) return <p className="text-center mt-8">Loading books...</p>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load books</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">📚 Book List</h1>
        <Button onClick={() => navigate("/create-book")}>+ Add New Book</Button>
      </div>

      <div className="overflow-x-auto rounded-lg border shadow-sm overflow-y-auto max-h-[700px]">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Genre</th>
              <th className="px-4 py-3">ISBN</th>
              <th className="px-4 py-3">Copies</th>
              <th className="px-4 py-3">Available</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((book: any) => (
              <tr
                key={book._id}
                className="border-t hover:bg-accent/30 cursor-pointer"
                onClick={() => navigate(`/books/${book._id}`)}
              >
                <td className="px-4 py-3 font-medium text-gray-900">
                  {book.title}
                </td>
                <td className="px-4 py-3">{book.author}</td>
                <td className="px-4 py-3">{book.genre}</td>
                <td className="px-4 py-3">{book.isbn}</td>
                <td className="px-4 py-3">{book.copies}</td>
                <td className="px-4 py-3">
                  {book.available ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-500 font-semibold">No</span>
                  )}
                </td>
                <td
                  className="px-4 py-3 space-x-2 flex items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    className="cursor-pointer"
                    size="icon"
                    variant="outline"
                    onClick={() => navigate(`/books/${book._id}`)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>

                  <Button
                    className="cursor-pointer"
                    size="icon"
                    variant="outline"
                    onClick={() => navigate(`/edit-book/${book._id}`)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>

                  <Dialog
                    open={openDialogId === book._id}
                    onOpenChange={(open) =>
                      setOpenDialogId(open ? book._id : null)
                    }
                  >
                    <DialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="destructive"
                        className="cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                      </DialogHeader>
                      <p>
                        This will permanently delete{" "}
                        <strong>{book.title}</strong>.
                      </p>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setOpenDialogId(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(book._id)}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* 📘 Borrow Dialog */}
                  <Dialog
                    open={borrowModalId === book._id}
                    onOpenChange={(open) => {
                      if (open) {
                        setBorrowForm({
                          bookId: book._id,
                          quantity: 1,
                          dueDate: "",
                        });
                      }
                      setBorrowModalId(open ? book._id : null);
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        className="cursor-pointer"
                        size="icon"
                        variant="secondary"
                      >
                        <BookOpen className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Borrow "{book.title}"</DialogTitle>
                      </DialogHeader>

                      <div className="space-y-4">
                        <div>
                          <Label className="mb-2">Quantity</Label>
                          <Input
                            type="number"
                            min={1}
                            max={book.copies}
                            value={borrowForm.quantity}
                            onChange={(e) =>
                              setBorrowForm((prev) => ({
                                ...prev,
                                quantity: Number(e.target.value),
                              }))
                            }
                          />
                        </div>
                        <div>
                          <Label className="mb-2">Due Date</Label>
                          <Input
                            type="date"
                            value={borrowForm.dueDate}
                            onChange={(e) =>
                              setBorrowForm((prev) => ({
                                ...prev,
                                dueDate: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>

                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setBorrowModalId(null)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleBorrow}>Borrow</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
