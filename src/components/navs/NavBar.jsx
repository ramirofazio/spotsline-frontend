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
  useDisclosure,
} from "@nextui-org/react";
import { links } from ".";
import { Link, NavLink, useLoaderData, useLocation } from "react-router-dom";
import { getOfStorage } from "src/utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import AwsImage from "../images/AwsImage";
import { toast } from "sonner";
import { DefaultButton } from "..";
import ManageClientsModal from "../modals/ManageClientsModal";
import Loader from "../Loader";
import { actionProducts } from "src/redux/reducers";

export default function NavBar() {
  const { pathname } = useLocation();
  const { access_token } = useSelector((state) => state.auth);
  const { id, web_role } = useSelector((state) => state.user);

  const managedClient = getOfStorage("managedClient");

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [blur, setBlur] = React.useState(false);

  const categories = getOfStorage("categories") || useLoaderData();

  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    isMenuOpen ? setBlur(true) : window.scrollY < 250 && setBlur(false);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 250 || isMenuOpen) {
        setBlur(true);
      } else {
        setBlur(false);
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      setLoading(false);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen, pathname]);

  useEffect(() => {
    const button = document.getElementById("manage-clients-button");
    if (!managedClient?.id && web_role === Number(import.meta.env.VITE_SELLER_ROLE)) {
      if (button && !isOpen) {
        button.click();
      }
    }
  });

  const handleLogOut = () => {
    localStorage.clear();
    window.location.replace("/");
    toast.info("Sesión cerrada con exito", { description: "¡Esperamos verte pronto!" });
  };

  const handleManageClients = () => {
    onOpen();
  };

  return loading ? (
    <Loader />
  ) : (
    <Navbar
      shouldHideOnScroll={pathname !== "/" ? false : true}
      className={`bg-transparent py-2 transition ${pathname !== "/" ? "block bg-dark/60" : "fixed"} ${
        blur && "bg-dark/20 hover:bg-dark/60"
      } ${isMenuOpen && "py-0"}`}
      isBlurred={blur}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
    >
      <Link to="/">
        <AwsImage
          type="logos"
          identify="logoWhite"
          className={`w-24 transition hover:scale-110 hover:animate-pulse hover:cursor-pointer sm:w-24 md:w-32`}
          hidden={isMenuOpen ? true : false}
        />
      </Link>

      <div className="hidden items-center justify-start gap-3 sm:flex">
        {links.map(({ name, path }, index) => (
          <NavbarItem key={index} className={`group flex h-full items-center ${name === "inicio" && "hidden"}`}>
            <i
              className={`ri-arrow-down-s-line yellow-neon transition group-hover:scale-125 ${
                pathname === path && "pointer-events-none opacity-50"
              }`}
            ></i>
            {name === "productos" ? (
              <ProductsTab index={index} categories={categories} />
            ) : (
              <Link
                className={`w-full text-sm uppercase text-background lg:text-[15px]  ${
                  pathname === path && "pointer-events-none opacity-50"
                }`}
                to={path}
              >
                {name}
              </Link>
            )}
          </NavbarItem>
        ))}
      </div>

      <div className="sm:hidden">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className={`ml-20 text-background`} />
      </div>

      <MobileContent
        web_role={web_role}
        id={id}
        access_token={access_token}
        pathname={pathname}
        isMenuOpen={isMenuOpen}
        categories={categories}
        setIsMenuOpen={setIsMenuOpen}
        handleManageClients={handleManageClients}
        handleLogOut={handleLogOut}
      />
      <DesktopContent
        web_role={web_role}
        id={id}
        access_token={access_token}
        pathname={pathname}
        handleLogOut={handleLogOut}
        handleManageClients={handleManageClients}
      />
      {web_role === Number(import.meta.env.VITE_SELLER_ROLE) && (
        <ManageClientsModal isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} />
      )}
    </Navbar>
  );
}

function DesktopContent({ web_role, id, access_token, pathname, handleLogOut, handleManageClients }) {
  const { managedClient } = useSelector((state) => state.seller);
  const { items } = useSelector((state) => state.cart);
  return (
    <NavbarContent justify="end" className="hidden !justify-end sm:flex lg:mr-6">
      {!id && !access_token && (
        <DefaultButton
          as={Link}
          to={"/sign-in"}
          className={`!p-4 hover:opacity-50`}
          size="md"
          startContent={<i className="ri-user-fill mr-2 text-lg" />}
        >
          INICIAR SESION
        </DefaultButton>
      )}
      {web_role === Number(import.meta.env.VITE_ADMIN_ROLE) && (
        <Button
          as={Link}
          to={"/dashboard/vendedores"}
          className={`bg-gradient-to-br from-primary to-background transition hover:scale-110`}
          size="md"
          isIconOnly
        >
          <i className="ri-dashboard-fill text-2xl" />
        </Button>
      )}

      {web_role === Number(import.meta.env.VITE_SELLER_ROLE) && (
        <Button
          id="manage-clients-button"
          onClick={() => handleManageClients()}
          className={`bg-gradient-to-br from-primary to-background transition hover:scale-110`}
          size="md"
          isIconOnly
        >
          <i className={`ri-link text-2xl ${managedClient?.id && "animate-pulse text-green-600"}`} />
        </Button>
      )}

      {(web_role === Number(import.meta.env.VITE_USER_ROLE) ||
        web_role === Number(import.meta.env.VITE_SELLER_ROLE)) && (
        //? Solo seller y user tiene acceso aca
        <Button
          as={Link}
          to={"/user/profile"}
          className={`bg-gradient-to-br from-primary to-background transition hover:scale-110 ${
            pathname === "/user/profile" && "pointer-events-none from-background"
          }`}
          size="md"
          isIconOnly
        >
          <i className={`ri-user-line text-2xl ${managedClient?.id && "animate-pulse text-green-600"}`} />
        </Button>
      )}

      {id && access_token && (
        <>
          <div className="relative flex items-center justify-center">
            <Button
              as={Link}
              to="/carrito"
              className={`relative bg-gradient-to-br from-primary to-background transition hover:scale-110 ${
                pathname === "/carrito" && "pointer-events-none from-background"
              }`}
              size="md"
              isIconOnly
            >
              <i
                className={`ri-shopping-cart-2-line text-2xl ${managedClient?.id && "animate-pulse text-green-600"}`}
              />
            </Button>
            {items?.length > 0 && (
              <span className="absolute -bottom-2 -right-3 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-white font-bold">
                <p>{items.length}</p>
              </span>
            )}
          </div>
          <Button
            className={`bg-gradient-to-br from-primary to-background transition hover:scale-110`}
            size="md"
            isIconOnly
            onPress={handleLogOut}
          >
            <i className="ri-logout-circle-r-line text-2xl" />
          </Button>
        </>
      )}
    </NavbarContent>
  );
}

function MobileContent({
  web_role,
  id,
  access_token,
  pathname,
  handleLogOut,
  isMenuOpen,
  setIsMenuOpen,
  handleManageClients,
  categories,
}) {
  const { managedClient } = useSelector((state) => state.seller);
  const { items } = useSelector((state) => state.cart);
  return (
    <NavbarMenu className="gap-4 overflow-hidden bg-gradient-to-br from-primary to-white/20">
      <div className="absolute -right-48 -top-10 -z-40 opacity-50">
        <AwsImage type="logos" identify="logoBlack" hidden={isMenuOpen ? false : true} className="rotate-12" />
      </div>

      {links.map(({ name, path }, i) => {
        return name === "productos" ? (
          <NavbarMenuItem
            onClick={() => setIsMenuOpen(false)}
            className="flex w-[12rem] items-center gap-1.5 border-b-2  border-dark/50 p-1"
            key={i}
          >
            <i className="ri-arrow-right-s-line text-md  !text-secondary"></i>
            <ProductsTab
              index={i}
              className=" font-primary text-lg uppercase text-white"
              categories={categories}
              setIsMenuOpen={setIsMenuOpen}
            />
          </NavbarMenuItem>
        ) : (
          <NavbarMenuItem onClick={() => setIsMenuOpen(false)} className="w-fit " key={i}>
            <NavLink className="flex h-full w-[12rem] items-center gap-1.5 border-b-2  border-dark/50 p-1" to={path}>
              <i className="ri-arrow-right-s-line text-md  !text-secondary"></i>
              <p className="w-full font-primary text-lg uppercase text-white">{name}</p>
            </NavLink>
          </NavbarMenuItem>
        );
      })}

      <div className="mt-10 flex items-center justify-evenly">
        {!id && !access_token && (
          <DefaultButton
            as={Link}
            to={"/sign-in"}
            className="bg-gradient-to-tl from-primary to-background shadow-xl"
            size="md"
            startContent={<i className="ri-user-fill mr-2 text-lg" />}
          >
            INICIAR SESION
          </DefaultButton>
        )}

        {web_role === Number(import.meta.env.VITE_ADMIN_ROLE) && (
          <Button
            as={Link}
            to={"/dashboard/vendedores"}
            className={`bg-gradient-to-tl from-primary to-background shadow-xl`}
            size="lg"
            isIconOnly
          >
            <i className="ri-dashboard-fill text-2xl" />
          </Button>
        )}

        {web_role === Number(import.meta.env.VITE_SELLER_ROLE) && (
          <Button
            id="manage-clients-button"
            onPress={() => {
              setIsMenuOpen(false);
              handleManageClients();
            }}
            className={`bg-gradient-to-tl from-primary to-background shadow-xl`}
            size="lg"
            isIconOnly
          >
            <i className={`ri-link text-2xl ${managedClient?.id && "animate-pulse text-green-600"}`} />
          </Button>
        )}

        {(web_role === Number(import.meta.env.VITE_USER_ROLE) ||
          web_role === Number(import.meta.env.VITE_SELLER_ROLE)) && (
          //? Solo seller y user tiene acceso aca
          <Button
            as={Link}
            to={"/user/profile"}
            onPress={() => setIsMenuOpen(false)}
            className={`bg-gradient-to-tl from-primary to-background shadow-xl ${
              pathname === "/user/profile" && "pointer-events-none from-background"
            }`}
            size="lg"
            isIconOnly
          >
            <i className={`ri-user-line text-2xl ${managedClient?.id && "animate-pulse text-green-600"}`} />
          </Button>
        )}

        {id && access_token && (
          <>
            <div className="relative flex items-center justify-center">
              <Button
                as={Link}
                to="/carrito"
                className={`relative bg-gradient-to-br from-primary to-background transition hover:scale-110 ${
                  pathname === "/carrito" && "pointer-events-none from-background"
                }`}
                size="md"
                isIconOnly
              >
                <i
                  className={`ri-shopping-cart-2-line text-2xl ${managedClient?.id && "animate-pulse text-green-600"}`}
                />
              </Button>
              {items?.length && (
                <span className="absolute -bottom-2 -right-3 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-white font-bold">
                  <p>{items.length}</p>
                </span>
              )}
            </div>
            <Button
              as={Link}
              to="/"
              className={`relative bg-gradient-to-br from-primary to-background transition hover:scale-110`}
              size="md"
              isIconOnly
              onClick={handleLogOut}
            >
              <i className="ri-logout-circle-r-line text-2xl" />
            </Button>
          </>
        )}
      </div>
      <div className="bottom-0 z-20 mx-auto mt-10 text-center">
        <h1 className="text-3xl">SPOTSLINE</h1>
        <p className="-mt-2 font-slogan text-2xl">Se ve bien.</p>
      </div>
      <div className="absolute -bottom-20 -left-28 blur-sm">
        <AwsImage type="logos" identify="logoWhite" className="w-[400px] rotate-12" />
      </div>
    </NavbarMenu>
  );
}

function ProductsTab({ index, categories, className, setIsMenuOpen }) {
  const dispatch = useDispatch();

  return (
    <Dropdown className={`bg-transparent shadow-none backdrop-blur-xl `} key={index}>
      <DropdownTrigger
        className={`font-primary text-sm text-background hover:cursor-pointer lg:text-[15px] ${className}`}
      >
        PRODUCTOS
      </DropdownTrigger>
      <DropdownMenu variant="solid" aria-label="Dropdown menu with icons" className="max-h-[50vh] overflow-scroll">
        <DropdownItem
          className="group my-[1px]  bg-gradient-to-tl  from-primary to-background p-0 uppercase transition"
          startContent={
            <NavLink
              onClick={() => {
                setIsMenuOpen(false);
                dispatch(actionProducts.setCategory(""));
              }}
              className="flex w-full items-center gap-2 p-1.5 "
              to="/productos/0"
            >
              <i className="ri-arrow-right-s-line  text-secondary transition group-hover:text-white"></i>
              <p>todos</p>
            </NavLink>
          }
        ></DropdownItem>

        {categories.map((c, index) => (
          <DropdownItem
            key={index}
            className="group my-[1px] bg-gradient-to-tl from-primary  to-background p-0 uppercase transition"
            startContent={
              <NavLink
                onClick={() => {
                  setIsMenuOpen(false);
                  dispatch(actionProducts.setCategory(c.value));
                }}
                className="flex w-full items-center gap-2 p-1.5 "
                to={`/productos/1?category=${c.value}`}
              >
                <i className="ri-arrow-right-s-line text-lg font-bold text-secondary transition group-hover:text-white"></i>
                <p>{c.name}</p>
              </NavLink>
            }
            //? Algo asi habria que hacer aca para filtrar automaticamente por categoria
          ></DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
