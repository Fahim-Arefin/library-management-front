// BookDetails.tsx
import { useParams, useNavigate } from "react-router";
import { useGetBookByIdQuery } from "@/redux/api/bookApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetBookByIdQuery(id as string);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Skeleton className="h-8 w-1/2 mb-4" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        Failed to load book details.
      </div>
    );
  }

  const book = data.data;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Button
        onClick={() => navigate(-1)}
        variant="outline"
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-primary font-bold">
            {book.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{book.genre}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-gray-500">Author</p>
            <p className="text-lg">{book.author}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500">ISBN</p>
            <p>{book.isbn}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-500">
              Copies Available
            </p>
            <p>
              {book.copies}{" "}
              <span
                className={`ml-2 text-sm font-medium ${
                  book.available ? "text-green-600" : "text-red-600"
                }`}
              >
                {book.available ? "Available" : "Unavailable"}
              </span>
            </p>
          </div>

          {book.description && (
            <div>
              <p className="text-sm font-semibold text-gray-500">Description</p>
              <p className="text-gray-700">{book.description}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
