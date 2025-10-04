import { Link, NavLink } from "react-router-dom";

import userAvatar from "../assets/img/user.png";
import Logo from "../assets/svg/logo.svg?react";

interface NavLinkItem {
  path: string;
  label: string;
}

const navLinks: NavLinkItem[] = [
  { path: "/", label: "Home" },
  { path: "/movies", label: "Movies" },
  { path: "/tv-series", label: "TV Series" },
  { path: "/bookmark", label: "Bookmark" },
];

export default function Header() {
  return (
    <header className="bg-surface h-16 md:h-20">
      <div className="flex items-center justify-between max-w-7xl mx-auto p-4 md:p-6 h-full">
        <Link to="/" aria-label="Go to Home" className="flex items-center gap-4">
          <Logo />
          <span className="text-xl font-medium mr-8 lg:mr-16">Filman</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-4 flex-grow text-gray-300">
          {navLinks.map((link) => {
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 transition-colors ${
                    isActive ? "text-text-primary bg-gray-900" : "text-text-secondary hover:text-text-primary"
                  }`
                }
                aria-label={link.label}>
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        <img src={userAvatar} alt="User Avatar" className="h-8 rounded-full md:mt-auto" />
      </div>
    </header>
  );
}
