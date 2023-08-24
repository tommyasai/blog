import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import { siteMetadata } from "~/siteMetadata";
import { isDarkMode } from "~/utils/darkMode";

export const Header = () => {
  const [siteLogo, setSiteLogo] = useState(siteMetadata.logo);

  useEffect(() => {
    if (isDarkMode() && siteMetadata.logo_dark_mode) {
      setSiteLogo(siteMetadata.logo_dark_mode);
    }
  }, []);

  return (
    <header className="flex justify-between items-center max-w-full w-full py-8 gap-x-12 md:gap-x-0">
      <Link
        className="home text-3xl font-medium no-underline flex-1 m-0 not-prose md:my-4"
        to="/"
      >
        {siteLogo ? (
          <img className="rounded-sm max-w-xs" alt="Website logo" src={siteLogo} loading="lazy"/>
        ) : (
          <span>{siteMetadata.domain}</span>
        )}
      </Link>

      <div className="sm:flex items-center gap-4 hidden flex-1">
        <h1>Tommyasai</h1>

      </div>
    </header>
  );
};