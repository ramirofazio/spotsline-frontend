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
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import logo from "assets/logo.png";
import { getOfStorage } from "src/utils/localStorage";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [blur, setBlur] = React.useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();
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
      className="fixed bg-transparent md:py-4 "
      isBlurred={blur}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
    >
      <NavbarContent justify="start">
        <Image
          src="/isotipoblanco.png"
          hidden={isMenuOpen ? true : false}
          className="mr-20 w-20 transition hover:scale-110 hover:animate-pulse hover:cursor-pointer sm:w-24 md:w-32"
          onClick={() => navigate("/")}
        />
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
                    className="group my-[1px]  bg-gradient-to-tl from-primary to-background uppercase transition"
                    startContent={
                      <i className="ri-arrow-right-s-line text-lg font-bold text-secondary transition group-hover:text-white"></i>
                    }
                    onClick={() => navigate("/productos/0")}
                  >
                    Todos
                  </DropdownItem>
                  {categories.map((c, index) => (
                    <DropdownItem
                      key={index}
                      className="group my-[1px] bg-gradient-to-tl  from-primary to-background uppercase transition"
                      startContent={
                        <i className="ri-arrow-right-s-line text-lg font-bold text-secondary transition group-hover:text-white"></i>
                      }
                      onClick={() => navigate(`/productos/${c}`)}
                      //? Algo asi habria que hacer aca para filtrar automaticamente por categoria
                    >
                      {c}
                    </DropdownItem>
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
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className={`ml-20 ${pathname !== "/" && "text-background"} `}
        />
      </NavbarContent>

      <NavbarMenu className="gap-4 overflow-x-hidden bg-gradient-to-br from-primary to-white/20">
        <Image
          src={logo}
          hidden={isMenuOpen ? false : true}
          disableSkeleton
          className="absolute -right-24 -top-10 rotate-12"
        />
        {links.map(({ name, path }, index) => (
          <div className="relative -ml-6" key={index}>
            <Button
              variant=""
              className="white-neon w-52 justify-start rounded-none border-secondary font-bold uppercase drop-shadow-xl"
              startContent={<i className="ri-arrow-right-s-line text-md !text-secondary"></i>}
              onClick={() => {
                navigate(path);
                setIsMenuOpen(false);
              }}
            >
              {name}
            </Button>
            <div className="absolute left-0 h-[1px] w-40 rounded-r-full bg-white/60" />
          </div>
        ))}
        <div className="mt-10 flex items-center justify-evenly ">
          <Button size="lg" isIconOnly className="bg-gradient-to-tl  from-primary to-background shadow-xl">
            <i className="ri-shopping-cart-2-fill text-2xl" />
          </Button>
          <Button
            className="bg-gradient-to-tl from-primary to-background shadow-xl"
            size="lg"
            isIconOnly
            onPress={() => {
              navigate("sign-in");
              setIsMenuOpen(false);
            }}
          >
            <i className="ri-user-fill text-2xl" />
          </Button>
        </div>
        <div className="f bottom-0 mx-auto mt-10 text-center">
          <h1 className="text-3xl">SPOTSLINE</h1>
          <p className="-mt-2 font-slogan text-2xl">Se ve bien.</p>
        </div>
      </NavbarMenu>

      <NavbarContent justify="end" className="hidden sm:flex">
        <Button
          className={`bg-gradient-to-br from-primary to-background transition hover:scale-110 ${
            pathname === "/sign-in" && "white-neon"
          }`}
          size="md"
          isIconOnly
          onPress={() => navigate("sign-in")}
        >
          <i className="ri-user-fill text-2xl" />
        </Button>
        <Button
          className="bg-gradient-to-br from-primary to-background transition hover:scale-110"
          size="md"
          isIconOnly
        >
          <i className="ri-shopping-cart-2-fill text-2xl" />
        </Button>
      </NavbarContent>
    </Navbar>
  );
}
