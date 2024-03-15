import React, { useEffect } from "react";
import {
  Navbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { links } from ".";
import { Link, NavLink, useLoaderData, useLocation } from "react-router-dom";
import { getOfStorage } from "src/utils/localStorage";
import { useSelector } from "react-redux";
import AwsImage from "../images/AwsImage";

export default function NavBar() {
  const { id } = useSelector((state) => state.user);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [blur, setBlur] = React.useState(false);

  const { pathname } = useLocation();
  const categories = getOfStorage("categories") || useLoaderData();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 250 || isMenuOpen || (window.innerWidth > 700 && window.innerWidth < 1000)) {
        setBlur(true);
      } else {
        setBlur(false);
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen, pathname]);

  return (
    <Navbar
      shouldHideOnScroll
      className={`xl:rounded-bl-2xl xl:rounded-br-2xl ${
        pathname !== "/" ? "bg-dark/30 shadow-xl" : "bg-transparent"
      }  md:py-4 ${pathname === "/carrito" ? "block" : "fixed"}`}
      isBlurred={blur}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
    >
      <NavbarContent justify="start">
        <Link to="/">
          <AwsImage
            type="logos"
            identify="logoWhite"
            className="mr-20 w-20  transition hover:scale-110 hover:animate-pulse hover:cursor-pointer sm:w-24 md:w-32"
            hidden={isMenuOpen ? true : false}
          />
        </Link>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex xl:gap-24 " justify="center">
        {links.map(({ name, path }, index) => (
          <NavbarItem
            key={index}
            className={`group flex h-full items-center gap-2 border-b-4 border-transparent  px-2 ${
              name === "inicio" && "hidden"
            } ${pathname === path && " border-primary"}`}
          >
            <i className="ri-arrow-down-s-line yellow-neon text-xl font-bold transition group-hover:scale-125"></i>
            {name === "productos" ? (
              <Dropdown className="bg-transparent shadow-none backdrop-blur-xl" key={index}>
                <DropdownTrigger className="text-background hover:cursor-pointer xl:text-xl">PRODUCTOS</DropdownTrigger>
                <DropdownMenu
                  variant="solid"
                  aria-label="Dropdown menu with icons"
                  className="max-h-[50vh] overflow-scroll"
                >
                  <DropdownItem
                    className="group my-[1px]  bg-gradient-to-tl  from-primary to-background p-0 uppercase transition"
                    startContent={
                      <NavLink className="flex w-full items-center gap-2 p-1.5 " to="/productos/0">
                        <i className="ri-arrow-right-s-line text-lg font-bold text-secondary transition group-hover:text-white"></i>
                        <p>todos</p>
                      </NavLink>
                    }
                  ></DropdownItem>

                  {categories.map((c, index) => (
                    <DropdownItem
                      key={index}
                      className="group my-[1px] bg-gradient-to-tl from-primary  to-background p-0 uppercase transition"
                      startContent={
                        <NavLink className="flex w-full items-center gap-2 p-1.5 " to={`/productos/${c}`}>
                          <i className="ri-arrow-right-s-line text-lg font-bold text-secondary transition group-hover:text-white"></i>
                          <p>{c}</p>
                        </NavLink>
                      }
                      //? Algo asi habria que hacer aca para filtrar automaticamente por categoria
                    ></DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Link className={`text-md w-full  uppercase text-background xl:text-xl`} to={path}>
                {name}
              </Link>
            )}
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end" className="sm:hidden">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className={`ml-20 text-background`} />
      </NavbarContent>

      <NavbarMenu className="gap-4 overflow-x-hidden bg-gradient-to-br from-primary to-white/20">
        <div className="absolute -right-24 -top-10 ">
          <AwsImage type="logos" identify="logoBlack" hidden={isMenuOpen ? false : true} className="rotate-12" />
        </div>
        {links.map(({ name, path }, index) => (
          <NavLink className="relative -ml-6" key={index} onClick={() => setIsMenuOpen(false)} to={path}>
            <Button
              variant=""
              className="white-neon w-52 justify-start rounded-none border-b-2  border-secondary font-bold uppercase drop-shadow-xl"
              startContent={<i className="ri-arrow-right-s-line text-md !text-secondary"></i>}
            >
              {name}
            </Button>
          </NavLink>
        ))}
        <div className="mt-10 flex items-center justify-evenly ">
          <Link onClick={() => setIsMenuOpen(false)} to="/carrito">
            <Button size="lg" isIconOnly className="bg-gradient-to-tl  from-primary to-background shadow-xl">
              <i className="ri-shopping-cart-2-fill text-2xl" />
            </Button>
          </Link>
          <Link onClick={() => setIsMenuOpen(false)} to={id ? `/user/profile` : "/sign-in"}>
            <Button className="bg-gradient-to-tl from-primary to-background shadow-xl" size="lg" isIconOnly>
              <i className="ri-user-fill text-2xl" />
            </Button>
          </Link>
        </div>
        <div className="f bottom-0 mx-auto mt-10 text-center">
          <h1 className="text-3xl">SPOTSLINE</h1>
          <p className="-mt-2 font-slogan text-2xl">Se ve bien.</p>
        </div>
      </NavbarMenu>

      <NavbarContent justify="end" className="hidden sm:flex">
        <Link onClick={() => setIsMenuOpen(false)} to={id ? `/user/profile` : "/sign-in"}>
          <Button
            className={`bg-gradient-to-br from-primary to-background transition hover:scale-110 ${
              pathname === "/sign-in" && "white-neon"
            }`}
            size="md"
            isIconOnly
          >
            <i className="ri-user-fill text-2xl" />
          </Button>
        </Link>
        <Link onClick={() => setIsMenuOpen(false)} to="/carrito">
          <Button
            className="bg-gradient-to-br from-primary to-background transition hover:scale-110"
            size="md"
            isIconOnly
          >
            <i className="ri-shopping-cart-2-fill text-2xl" />
          </Button>
        </Link>
      </NavbarContent>
    </Navbar>
  );
}
