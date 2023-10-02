import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface NavItemProps {
  children: React.ReactNode;
  active: boolean;
  disabled?: boolean;
  href: string;
  className?: string;
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  active = false,
  disabled = false,
  children,
  className,
}) => {
  return (
    <Link
      className={twMerge(
        `
    text-secondary tracking-wide  font-bold text-sm
 `,
        [
          className,
          active && "underline font-semibold",
          disabled && "opacity-50 cursor-not-allowed hover:no-underline",
        ]
      )}
      href={disabled ? "#" : href}
    >
      {children}
    </Link>
  );
};

export default NavItem;
