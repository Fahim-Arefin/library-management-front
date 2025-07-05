import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItemClasses = ({ isActive }: { isActive: boolean }) =>
    `transition-colors duration-200 ${
      isActive ? "text-primary font-semibold text-teal-500" : "text-gray-700"
    }`;

  return (
    <header className="w-full shadow-sm bg-white fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink to="/" className="text-xl font-bold text-primary">
          📚 LibraryMS
        </NavLink>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <NavLink to="/books" className={navItemClasses}>
            All Books
          </NavLink>
          <NavLink to="/create-book" className={navItemClasses}>
            Add Book
          </NavLink>
          <NavLink to="/borrow-summary" className={navItemClasses}>
            Borrow Summary
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 flex flex-col bg-white shadow-md">
          <NavLink
            to="/books"
            className={navItemClasses}
            onClick={() => setMenuOpen(false)}
          >
            All Books
          </NavLink>
          <NavLink
            to="/create-book"
            className={navItemClasses}
            onClick={() => setMenuOpen(false)}
          >
            Add Book
          </NavLink>
          <NavLink
            to="/borrow-summary"
            className={navItemClasses}
            onClick={() => setMenuOpen(false)}
          >
            Borrow Summary
          </NavLink>
        </div>
      )}
    </header>
  );
}
