import { siteMetadata } from "~/siteMetadata";
import githubLogo from "../assets/github.webp";
import linkedinLogo from "../assets/linkedin.webp";
import twitterLogo from "../assets/x.png";
import { ExternalLink } from "./ExternalLink";

export const SocialMedia = () => {
  return (
    <div className="flex justify-center gap-4 not-prose">
      <Icon
        href={`https://github.com/${siteMetadata.github}`}
        alt="GitHub profile"
        src={githubLogo}
      />
      <Icon
        href={`https://twitter.com/${siteMetadata.twitter}`}
        alt="Twitter profile"
        src={twitterLogo}
      />
      <Icon
        href={`https://linkedin.com/in/${siteMetadata.linkedin}`}
        alt="LinkedIn profile"
        src={linkedinLogo}
      />
    </div>
  );
};

interface IconProps {
  href: string;
  alt: string;
  src: string;
}

const Icon = ({ href, alt, src }: IconProps) => {
  return (
    <ExternalLink href={href}>
      <img
        alt={alt}
        src={src}
        width={32}
        height={32}
        loading="lazy"
        className="dark:invert"
      />
    </ExternalLink>
  );
};
