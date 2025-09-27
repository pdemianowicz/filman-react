import { Link, NavLink } from "react-router-dom";

import userAvatar from "../assets/img/user.png";
import Logo from "../assets/svg/logo.svg?react";
import HomeIcon from "../assets/svg/icon-nav-home.svg?react";
import MoviesIcon from "../assets/svg/icon-nav-movies.svg?react";
import TvSeriesIcon from "../assets/svg/icon-nav-tv-series.svg?react";

interface NavLinkItem {
  path: string;
  label: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const navLinks: NavLinkItem[] = [
  { path: "/", label: "Home", icon: HomeIcon },
  { path: "/movies", label: "Movies", icon: MoviesIcon },
  { path: "/tv-series", label: "TV Series", icon: TvSeriesIcon },
];

export default function Header() {
  return (
    <header className="bg-surface p-4 md:py-8 flex items-center justify-between md:flex-col md:w-24 md:max-h-screen md:rounded-xl">
      <Link to="/" aria-label="Go to Home">
        <Logo className="h-6 md:h-8" />
      </Link>

      <nav className="flex gap-4 md:flex-col md:my-auto">
        {navLinks.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `p-2 rounded-lg transition-colors ${isActive ? "text-text-primary" : "text-text-secondary hover:text-accent"}`
              }
              aria-label={link.label}>
              <Icon className="h-5 w-5 md:h-6 md:w-6" />
            </NavLink>
          );
        })}
      </nav>

      <img src={userAvatar} alt="User Avatar" className="h-8 rounded-full" />
    </header>
  );
}
