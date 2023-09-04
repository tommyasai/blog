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
    <header className="flex flex-col sm:flex-row justify-between items-center max-w-full w-full md:py-8 gap-x-6">
      <div className="flex items-center sm:order-2 flex-1 sm:hidden">
        <h1 className="m-0">Tommyasai</h1>
      </div>
      <Link
        className="home text-3xl font-medium no-underline flex-1 m-4 not-prose md:my-4"
        to="/"
      >
        {siteLogo ? (
          <img
            className="rounded-full max-w-xs md:max-w-sm"
            alt="Website logo"
            src={siteLogo}
            loading="lazy"
          />
        ) : (
          <span>{siteMetadata.domain}</span>
        )}
      </Link>

      <div className="sm:flex items-center hidden flex-1">
        <h1>Tommyasai</h1>
      </div>
    </header>
  );
};
