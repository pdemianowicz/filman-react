import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Header />
      <main className="flex-1 p-4 overflow-auto max-w-7xl container mx-auto">
        <SearchBar />
        <Outlet />
      </main>
    </div>
  );
}
