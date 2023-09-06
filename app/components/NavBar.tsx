import { Link } from "@remix-run/react";

export const NavBar = () => {
  return (
    <nav>
      <ul className="list-none flex space-x-4">
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};
