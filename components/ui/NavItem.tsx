import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface NavItemProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  active: boolean;
  disabled?: boolean;
  href: string;
  className?: string;
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  onClick,
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
      href={disabled ? "#" : href} // Förhindrar att disabled-länkar navigerar
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default NavItem;
