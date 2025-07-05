// EditBook.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "@/redux/api/bookApi";

const genreOptions = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: book, isLoading } = useGetBookByIdQuery(id);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: "",
    available: true,
  });

  // populate form when book loads
  useEffect(() => {
    if (book?.data) {
      const { title, author, genre, isbn, description, copies, available } =
        book.data;
      setFormData({
        title,
        author,
        genre: genre || "",
        isbn,
        description,
        copies: copies.toString(),
        available,
      });

      // ✅ Add this to confirm what you’re setting
      console.log("Populating form with book:", book.data);
    }
  }, [book]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;

    // If copies changed to 0, mark available false automatically
    const autoAvailable =
      name === "copies" && value === "0" ? false : formData.available;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
      available: name === "copies" ? autoAvailable : prev.available,
    }));
  };

  const handleGenreChange = (value: string) => {
    setFormData((prev) => ({ ...prev, genre: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      copies: parseInt(formData.copies),
      available: parseInt(formData.copies) > 0,
    };

    try {
      const res = await updateBook({ id, data: updatedData }).unwrap();
      toast.success(res?.message || "Book updated successfully");
      navigate("/books");
    } catch (error: any) {
      const message =
        error?.data?.error?.issues[0]?.message ||
        error?.data?.error?.[0]?.message ||
        error?.data?.message ||
        "Failed to update book.";
      toast.error(message);
    }
  };

  console.log(formData);

  if (isLoading || !formData.genre)
    return <p className="text-center mt-10">Loading book data...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-white rounded shadow-sm">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-4">
        ← Go Back
      </Button>

      <h2 className="text-xl font-semibold mb-6">Edit Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="mb-2">Title</Label>
          <Input name="title" value={formData.title} onChange={handleChange} />
        </div>

        <div>
          <Label className="mb-2">Author</Label>
          <Input
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label className="mb-2">Genre</Label>
          <Select value={formData.genre} onValueChange={handleGenreChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              {genreOptions.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-2">ISBN</Label>
          <Input name="isbn" value={formData.isbn} onChange={handleChange} />
        </div>

        <div>
          <Label className="mb-2">Description</Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label className="mb-2">Copies</Label>
          <Input
            type="number"
            name="copies"
            min={0}
            value={formData.copies}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update Book"}
        </Button>
      </form>
    </div>
  );
}
