import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-white via-[#f8f5f0] to-[#f0ebe5]">
      <Card className="max-w-xl w-full text-center py-10 shadow-lg border-muted border-2">
        <CardContent className="space-y-6">
          <h1 className="text-4xl font-bold text-[#444]">
            📚 Welcome to the Library
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage books, borrowing, and summaries with ease.
          </p>
          <Button size="lg" asChild>
            <a href="/books">Explore Book List</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
