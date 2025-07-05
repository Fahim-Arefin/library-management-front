// CreateBook.tsx
import { useNavigate } from "react-router";
import { useState } from "react";
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
import { useCreateBookMutation } from "@/redux/api/bookApi";

const genreOptions = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

export default function CreateBook() {
  const navigate = useNavigate();
  const [createBook, { isLoading }] = useCreateBookMutation();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: "",
    available: true,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGenreChange = (value: string) => {
    setFormData((prev) => ({ ...prev, genre: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      ...formData,
      copies: parseInt(formData.copies),
    };

    try {
      const response = await createBook(data).unwrap(); // ✅ get the API response
      toast.success(response?.message || "Book created successfully");
      navigate("/books");
    } catch (error: any) {
      console.error(error);

      // Try to extract error message from server response
      const message =
        error?.data?.error[0]?.message ||
        error?.data?.message ||
        "Failed to create book. Please try again.";

      toast.error(message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-white rounded shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Add New Book</h2>
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
          <Select onValueChange={handleGenreChange} value={formData.genre}>
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
            min={1}
            value={formData.copies}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label className="flex gap-2 items-center">
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="scale-110"
            />
            Available
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
