import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface NavItemProps {
  children: React.ReactNode;
  active: boolean;
  href: string;
  className?: string;
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  active = false,
  children,
  className,
}) => {
  return (
    <Link
      className={twMerge(
        `
    text-secondary hover:underline underline-offset-2
 `,
        className
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavItem;
