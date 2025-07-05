export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-4 mt-auto text-sm text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4">
        © {new Date().getFullYear()} Library Management System. All rights
        reserved.
      </div>
    </footer>
  );
}
