// app/(frontend)/borrow-summary/page.tsx
"use client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetBorrowSummaryQuery } from "@/redux/api/borrowApi";

export default function BorrowSummaryPage() {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery(undefined);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-primary">
        📊 Borrow Summary
      </h1>

      {isLoading && (
        <Card className="p-6">
          <Skeleton className="h-8 w-full mb-4" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
        </Card>
      )}

      {isError && (
        <p className="text-center text-red-500">
          Failed to load borrow summary.
        </p>
      )}

      {!isLoading && !isError && (
        <div className="overflow-x-auto rounded-lg border shadow-sm">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Book Title</th>
                <th className="px-4 py-3">ISBN</th>
                <th className="px-4 py-3">Total Quantity Borrowed</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item: any) => (
                <tr key={item._id} className="border-t hover:bg-accent/30">
                  <td className="px-4 py-3 font-medium">{item.book?.title}</td>
                  <td className="px-4 py-3">{item.book?.isbn}</td>
                  <td className="px-4 py-3 text-primary font-semibold">
                    {item.totalQuantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
