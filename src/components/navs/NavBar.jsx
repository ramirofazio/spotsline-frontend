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
  NavbarMenuItem,
} from "@nextui-org/react";
import { links } from ".";
import { Link, NavLink, useLoaderData, useLocation } from "react-router-dom";
import { getOfStorage } from "src/utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import AwsImage from "../images/AwsImage";
import { toast } from "sonner";
import { removeAuthWithToken } from "src/api";
import { actionsAuth, actionsUser } from "src/redux/reducers";

export default function NavBar() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { access_token } = useSelector((state) => state.auth);
  const { id, web_role } = useSelector((state) => state.user);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [blur, setBlur] = React.useState(false);

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

      <NavbarContent className="hidden gap-4  sm:flex xl:gap-24 " justify="center">
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

      {/* MOBILE */}
      <NavbarMenu className="gap-4 overflow-x-hidden bg-gradient-to-br from-primary to-white/20">
        <div className="absolute -right-48 -top-10 -z-40 opacity-50">
          <AwsImage type="logos" identify="logoBlack" hidden={isMenuOpen ? false : true} className="rotate-12" />
        </div>

        {links.map(({ name, path }, i) => (
          <NavbarMenuItem onClick={() => setIsMenuOpen(false)} className="w-fit " key={i}>
            <NavLink className="flex h-full w-[12rem] items-center gap-1.5  border-b-2 p-1" to={path}>
              <i className="ri-arrow-right-s-line text-md  !text-secondary"></i>
              <p className="w-full font-primary text-lg uppercase text-white">{name}</p>
            </NavLink>
          </NavbarMenuItem>
        ))}

        <div className="mt-10 flex items-center justify-evenly ">
          {web_role === Number(import.meta.env.VITE_ADMIN_ROLE) && (
            <Button
              className={`bg-gradient-to-tl from-primary to-background shadow-xl ${
                pathname === "/dashboard" && "pointer-events-none from-background"
              }`}
              size="lg"
              isIconOnly
            >
              <Link onClick={() => setIsMenuOpen(false)} to={"/dashboard"}>
                <i className="ri-dashboard-fill text-2xl" />
              </Link>
            </Button>
          )}

          <Button
            className={`bg-gradient-to-tl from-primary to-background shadow-xl ${
              (pathname === "/sign-in" || pathname === "/user/profile") && "pointer-events-none from-background"
            }`}
            size="lg"
            isIconOnly
          >
            <Link onClick={() => setIsMenuOpen(false)} to={id ? `user/profile` : "sign-in"}>
              <i className="ri-user-fill text-2xl" />
            </Link>
          </Button>
          <Button
            className={`bg-gradient-to-tl  from-primary to-background shadow-xl ${
              pathname === "/carrito" && "pointer-events-none from-background"
            }`}
            onClick={() => setIsMenuOpen(false)}
            size="lg"
            isIconOnly
          >
            <Link to="/carrito">
              <i className="ri-shopping-cart-2-fill text-2xl" />
            </Link>
          </Button>
          {id && access_token && (
            <Button
              className="bg-gradient-to-tl from-primary to-background shadow-xl"
              size="lg"
              isIconOnly
              onPress={() => {
                toast.info("Sesión cerrada con exito", { description: "¡Esperamos verte pronto!" });
                setTimeout(() => {
                  //? Para evitar salto y que aparezca el errorBundler
                  //TODO ANALIZAR ESTO
                  removeAuthWithToken();
                  dispatch(actionsUser.cleanUser());
                  dispatch(actionsAuth.cleanAuth());
                }, 1000);
              }}
            >
              <Link onClick={() => setIsMenuOpen(false)} to={"/"}>
                <i className="ri-logout-circle-line text-2xl" />
              </Link>
            </Button>
          )}
        </div>
        <div className="f bottom-0 mx-auto mt-10 text-center">
          <h1 className="text-3xl">SPOTSLINE</h1>
          <p className="-mt-2 font-slogan text-2xl">Se ve bien.</p>
        </div>
      </NavbarMenu>

      {/* DESKTOP */}
      <NavbarContent justify="end" className="hidden sm:flex">
        {web_role === Number(import.meta.env.VITE_ADMIN_ROLE) && (
          <Button
            className={`bg-gradient-to-br from-primary to-background transition hover:scale-110 ${
              pathname === "/dashboard" && "pointer-events-none from-background"
            }`}
            size="md"
            isIconOnly
          >
            <Link to={"/dashboard"}>
              <i className="ri-dashboard-fill text-2xl" />
            </Link>
          </Button>
        )}
        <Button
          className={`bg-gradient-to-br from-primary to-background transition hover:scale-110 ${
            (pathname === "/sign-in" || pathname === "/user/profile") && "pointer-events-none from-background"
          }`}
          size="md"
          isIconOnly
        >
          <Link to={id ? `/user/profile` : "/sign-in"}>
            <i className="ri-user-fill text-2xl" />
          </Link>
        </Button>
        <Button
          className={`bg-gradient-to-br from-primary to-background transition hover:scale-110 ${
            pathname === "/carrito" && "pointer-events-none from-background"
          }`}
          size="md"
          isIconOnly
        >
          <Link to="/carrito">
            <i className="ri-shopping-cart-2-fill text-2xl" />
          </Link>
        </Button>
      </NavbarContent>
    </Navbar>
  );
}
