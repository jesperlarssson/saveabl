import { navigation } from "@/lib/navigation";
import NavItem from "./NavItem";

const Footer = () => {
  return (
    <div>
      <ul className="flex gap-x-4">
        {navigation.map((item) => (
          <li key={item.id}>
            <NavItem active={false} href={item.path}>
              {item.name}
            </NavItem>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
