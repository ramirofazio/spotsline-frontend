import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarItem,
  NavbarMenuItem,
  Link,
  Button,
  Image,
} from "@nextui-org/react";
import logo from "assets/logo.png";
import { links } from ".";

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
        <NavbarBrand>
          <Image src={logo} className="w-20" radius="none" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="sign-in" variant="solid">
            LOGIN
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="">
        {links.map(({ name, path }, index) => (
          <NavbarMenuItem key={index} className="gap-2">
            <Link className="w-full " href={path} size="md" color="gray">
              {name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
