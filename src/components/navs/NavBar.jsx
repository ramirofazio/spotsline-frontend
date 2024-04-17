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
import { removeAuthWithToken } from "src/api";
import { actionsAuth, actionsUser } from "src/redux/reducers";
import { DefaultButton } from "..";
import ManageClientsModal from "../modals/ManageClientsModal";

export default function NavBar() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const params = new URLSearchParams(window.location.search);
  const sellerLogIn = params.get("sellerLogIn");

  const { access_token } = useSelector((state) => state.auth);
  const { id, web_role } = useSelector((state) => state.user);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

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

  useEffect(() => {
    if (sellerLogIn) {
      //TODO VALIDAR ACA QUE YA HAYA SELECCIONADO UN CLIENTE, SINO MANDAR ALGUNA PROP AL MODAL PARA QUE NO SEA DISSMISABLE
      document.getElementById("manage-clients-button").click();
    }
  }, [document]);

  const handleManageClients = () => {
    onOpen();
  };

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

      <MobileContent
        web_role={web_role}
        id={id}
        access_token={access_token}
        pathname={pathname}
        dispatch={dispatch}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        handleManageClients={handleManageClients}
      />
      <DesktopContent
        web_role={web_role}
        id={id}
        access_token={access_token}
        pathname={pathname}
        dispatch={dispatch}
        handleManageClients={handleManageClients}
      />
      {web_role === Number(import.meta.env.VITE_SELLER_ROLE) && (
        <ManageClientsModal isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} />
      )}
    </Navbar>
  );
}

function DesktopContent({ web_role, id, access_token, pathname, dispatch, handleManageClients }) {
  const { managedClient } = useSelector((state) => state.seller);

  return (
    <NavbarContent justify="end" className="hidden sm:flex">
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
          to={"/dashboard/productos/1"}
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
          className={`bg-gradient-to-br from-primary to-background transition hover:scale-110 ${
            managedClient.id && "animate-pulse from-success to-success"
          }`}
          size="md"
          isIconOnly
        >
          <i className="ri-customer-service-fill text-2xl" />
        </Button>
      )}

      {web_role === Number(import.meta.env.VITE_USER_ROLE) && (
        <Button
          as={Link}
          to={"/user/profile"}
          className={`bg-gradient-to-br from-primary to-background transition hover:scale-110 ${
            pathname === "/user/profile" && "pointer-events-none from-background"
          }`}
          size="md"
          isIconOnly
        >
          <i className="ri-user-fill text-2xl" />
        </Button>
      )}

      {id && access_token && (
        <>
          <Button
            as={Link}
            to="/carrito"
            className={`bg-gradient-to-br from-primary to-background transition hover:scale-110 ${
              pathname === "/carrito" && "pointer-events-none from-background"
            }`}
            size="md"
            isIconOnly
          >
            <i className="ri-shopping-cart-2-fill text-2xl" />
          </Button>
          <Button
            as={Link}
            to={"/"}
            className={`bg-gradient-to-br from-primary to-background transition hover:scale-110`}
            size="md"
            isIconOnly
            onPress={() => {
              setTimeout(() => {
                removeAuthWithToken();
                dispatch(actionsUser.cleanUser());
                dispatch(actionsAuth.cleanAuth());
                toast.info("Sesión cerrada con exito", { description: "¡Esperamos verte pronto!" });
              }, 200);
            }}
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
  dispatch,
  isMenuOpen,
  setIsMenuOpen,
  handleManageClients,
}) {
  const { managedClient } = useSelector((state) => state.seller);

  return (
    <NavbarMenu className="gap-4 overflow-hidden bg-gradient-to-br from-primary to-white/20">
      <div className="absolute -right-48 -top-10 -z-40 opacity-50">
        <AwsImage type="logos" identify="logoBlack" hidden={isMenuOpen ? false : true} className="rotate-12" />
      </div>

      {links.map(({ name, path }, i) => (
        <NavbarMenuItem onClick={() => setIsMenuOpen(false)} className="w-fit " key={i}>
          <NavLink className="flex h-full w-[12rem] items-center gap-1.5 border-b-2  border-dark/50 p-1" to={path}>
            <i className="ri-arrow-right-s-line text-md  !text-secondary"></i>
            <p className="w-full font-primary text-lg uppercase text-white">{name}</p>
          </NavLink>
        </NavbarMenuItem>
      ))}

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
            to={"/dashboard/productos/1"}
            onPress={() => setIsMenuOpen(false)}
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
            className={`bg-gradient-to-tl from-primary to-background shadow-xl ${
              managedClient.id && "animate-pulse from-success to-success"
            }`}
            size="lg"
            isIconOnly
          >
            <i className="ri-customer-service-fill text-2xl" />
          </Button>
        )}

        {web_role === Number(import.meta.env.VITE_USER_ROLE) && (
          <Button
            as={Link}
            to={"/user/profile"}
            className={`bg-gradient-to-tl from-primary to-background shadow-xl ${
              pathname === "/user/profile" && "pointer-events-none from-background"
            }`}
            size="lg"
            isIconOnly
          >
            <i className="ri-user-fill text-2xl" />
          </Button>
        )}

        {id && access_token && (
          <>
            <Button
              as={Link}
              to={"/carrito"}
              onPress={() => setIsMenuOpen(false)}
              className={`bg-gradient-to-tl  from-primary to-background shadow-xl ${
                pathname === "/carrito" && "pointer-events-none from-background"
              }`}
              size="lg"
              isIconOnly
            >
              <i className="ri-shopping-cart-2-fill text-2xl" />
            </Button>
            <Button
              as={Link}
              to={"/"}
              className="bg-gradient-to-tl from-primary to-background shadow-xl"
              size="lg"
              isIconOnly
              onPress={() => {
                setIsMenuOpen(false);
                setTimeout(() => {
                  removeAuthWithToken();
                  dispatch(actionsUser.cleanUser());
                  dispatch(actionsAuth.cleanAuth());
                  toast.info("Sesión cerrada con exito", { description: "¡Esperamos verte pronto!" });
                }, 200);
              }}
            >
              <i className="ri-logout-circle-r-line text-2xl" />
            </Button>
          </>
        )}
      </div>
      <div className="bottom-0 mx-auto mt-10 text-center">
        <h1 className="text-3xl">SPOTSLINE</h1>
        <p className="-mt-2 font-slogan text-2xl">Se ve bien.</p>
      </div>
      <div className="absolute -bottom-20 -left-28">
        <AwsImage type="logos" identify="logoWhite" className="w-[400px] rotate-12" />
      </div>
    </NavbarMenu>
  );
}
