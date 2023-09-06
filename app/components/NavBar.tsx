import { Link } from "@remix-run/react";

export const NavBar = () => {
  return (
    <nav>
      <ul className="text-2xl list-none flex space-x-4 m-2 p-0">
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
