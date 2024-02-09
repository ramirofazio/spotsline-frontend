import React, { useEffect } from "react";
import {
  Navbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarItem,
  Button,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { links } from ".";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "assets/logo.png";

const mockCategories = ["luz 1", "luz 2", "luz 3", "luz 4", "luz 5", "luz 6", "luz 8", "luz 9"];

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [blur, setBlur] = React.useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 350) {
        setBlur(true);
      } else {
        setBlur(false);
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Navbar
      shouldHideOnScroll
      className="fixed bg-transparent"
      isBlurred={isMenuOpen ? true : blur ? true : false}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent justify="start" className="sm:hidden">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="mr-20" />
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {links.map(({ name, path }, index) => (
          <NavbarItem
            key={index}
            className={`group flex h-full items-center gap-2 border-b-4 border-transparent px-2 ${
              pathname === path && " border-primary"
            }`}
          >
            <i className="ri-arrow-down-s-line text-lg font-bold text-primary transition group-hover:animate-pulse"></i>
            {name === "productos" ? (
              <Dropdown className="border-1 border-primary bg-secondary">
                <DropdownTrigger className="text-secondary hover:cursor-pointer">PRODUCTOS</DropdownTrigger>
                <DropdownMenu variant="solid" aria-label="Dropdown menu with icons" color="primary">
                  <DropdownItem
                    key={index}
                    className="group my-[1px] transition hover:opacity-90"
                    startContent={
                      <i className="ri-arrow-right-s-line text-lg font-bold text-secondary transition group-hover:text-white"></i>
                    }
                    onClick={() => navigate("/productos/0")}
                  >
                    Todos
                  </DropdownItem>
                  {mockCategories.map((text, index) => (
                    <DropdownItem
                      className="group my-[1px] transition hover:opacity-90"
                      key={index}
                      startContent={
                        <i className="ri-arrow-right-s-line text-lg font-bold text-secondary transition group-hover:text-white"></i>
                      }
                      onClick={() => navigate(`/productos/${text}`)}
                      //? Algo asi habria que hacer aca para filtrar automaticamente por categoria
                    >
                      {text}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Link
                className={`text-md w-full uppercase text-secondary ${pathname === path && "!text-primary"}`}
                to={path}
              >
                {name}
              </Link>
            )}
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <Image
          src={logo}
          hidden={isMenuOpen ? true : false}
          className="ml-20 w-20 hover:animate-pulse hover:cursor-pointer md:w-24  "
          onClick={() => navigate("/")}
        />
      </NavbarContent>

      <NavbarMenu className="gap-4 bg-gradient-to-br from-primary to-white/20">
        <Image
          src={logo}
          hidden={isMenuOpen ? false : true}
          disableSkeleton
          className="absolute -right-24 -top-10 rotate-12"
        />
        {links.map(({ name, path }, index) => (
          <Button
            key={index}
            variant=""
            className="w-52 justify-start rounded-none border-b-2 border-secondary  font-bold uppercase text-white"
            startContent={<i className="ri-arrow-right-s-line text-md text-secondary"></i>}
            onClick={() => navigate(path)}
          >
            {name}
          </Button>
        ))}
        <div className="mt-10 flex items-center justify-evenly ">
          <Button className="bg-white" size="lg" isIconOnly>
            <i className="ri-shopping-cart-2-fill text-2xl" />
          </Button>
          <Button className="bg-white" size="lg" isIconOnly>
            <i className="ri-user-fill text-2xl" />
          </Button>
        </div>
      </NavbarMenu>
    </Navbar>
  );
}
