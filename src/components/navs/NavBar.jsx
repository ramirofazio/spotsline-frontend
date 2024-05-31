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
import { Link, NavLink, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { getOfStorage } from "src/utils/localStorage";
import { useDispatch, useSelector } from "react-redux";
import AwsImage from "../images/AwsImage";
import { toast } from "sonner";
import { DefaultButton } from "..";
import ManageClientsModal from "../modals/ManageClientsModal";
import { actionProducts } from "src/redux/reducers";
import Spinner from "../Spinner";
import { images } from "src/assets";
import { AnimatePresence, motion } from "framer-motion";

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
      document.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const button = document.getElementById("manage-clients-button");
    if (!managedClient?.id && web_role === Number(import.meta.env.VITE_SELLER_ROLE)) {
      if (button && !isOpen) {
        button.click();
      }
    }
  });

  if (loading) {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  const handleLogOut = () => {
    localStorage.clear();
    window.location.replace("/");
    toast.info("Sesión cerrada con exito", { description: "¡Esperamos verte pronto!" });
  };

  const handleManageClients = () => {
    onOpen();
  };

  return loading ? (
    <Spinner />
  ) : (
    <Navbar
      shouldHideOnScroll={pathname !== "/" ? false : true}
      className={`bg-transparent py-4 transition ${pathname !== "/" ? "block bg-background" : "fixed"} ${
        blur && "bg-dark/20 hover:bg-dark/60"
      } ${isMenuOpen && ""}`}
      isBlurred={blur}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
    >
      <Link to="/" onClick={() => pathname !== "/" && setLoading(true)}>
        <AnimatePresence>
          {!isMenuOpen && (
            <motion.img
              key="navbar-icon"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0, scale: 0 }}
              src={images.logoBlack}
              loading="lazy"
              className={`w-24 transition hover:scale-110 hover:animate-pulse hover:cursor-pointer sm:w-24 md:w-32`}
            />
          )}
        </AnimatePresence>
      </Link>

      <div className="hidden items-center justify-start gap-6 sm:flex">
        {links.map(({ name, path }, index) => (
          <NavbarItem key={index} className={`group flex h-full items-center gap-1 ${name === "inicio" && "hidden"}`}>
            <i
              className={`ri-arrow-down-s-line yellow-neon transition group-hover:scale-125 ${
                pathname === path && "pointer-events-none opacity-50"
              }`}
            ></i>
            {name === "productos" ? (
              <ProductsTab index={index} categories={categories} />
            ) : (
              <Link
                className={`w-full text-sm font-bold uppercase text-background lg:text-[15px] ${
                  pathname !== "/" && "text-dark"
                } ${pathname === path && "pointer-events-none opacity-50"}`}
                to={path}
              >
                {name}
              </Link>
            )}
          </NavbarItem>
        ))}
      </div>
      <AnimatePresence>
        <motion.div
          key="menuToggle-icon"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className={`!h-10 !w-10  text-dark sm:hidden`}
          />
        </motion.div>
      </AnimatePresence>

      <MobileContent
        setLoading={setLoading}
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
        setLoading={setLoading}
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

function DesktopContent({ web_role, id, access_token, pathname, handleLogOut, handleManageClients, setLoading }) {
  const { managedClient } = useSelector((state) => state.seller);
  const { items } = useSelector((state) => state.cart);
  return (
    <NavbarContent justify="end" className="hidden !justify-end sm:flex lg:mr-6">
      {!id && !access_token && (
        <DefaultButton
          as={Link}
          to={"/sign-in"}
          onClick={() => setLoading(true)}
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
          onClick={() => setLoading(true)}
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
        <>
          <Button
            as={Link}
            to={"/user/profile"}
            onClick={() => setLoading(true)}
            className={`bg-gradient-to-br from-primary to-background transition hover:scale-110 ${
              pathname.includes("/user/profile") && "pointer-events-none to-dark/50 !opacity-50"
            }`}
            size="md"
            isIconOnly
          >
            <i className={`ri-user-line text-2xl ${managedClient?.id && "animate-pulse text-green-600"}`} />
          </Button>
          <div className="relative flex items-center justify-center">
            <Button
              as={Link}
              to="/carrito"
              onClick={() => setLoading(true)}
              className={`relative bg-gradient-to-br from-primary to-background transition hover:scale-110 ${
                pathname === "/carrito" && "pointer-events-none to-dark/50 !opacity-50"
              }`}
              size="md"
              isIconOnly
            >
              <i
                className={`ri-shopping-cart-2-line text-2xl ${managedClient?.id && "animate-pulse text-green-600"}`}
              />
            </Button>
            {items?.length > 0 && (
              <span className="absolute -bottom-2 -right-3 z-50 flex h-5 w-5 items-center justify-center rounded-full bg-background font-bold outline outline-primary">
                <p>{items.length}</p>
              </span>
            )}
          </div>
        </>
      )}

      {id && access_token && (
        <Button
          className={`bg-gradient-to-br from-primary to-background transition hover:scale-110`}
          size="md"
          isIconOnly
          onPress={handleLogOut}
        >
          <i className="ri-logout-circle-r-line text-2xl" />
        </Button>
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
  setLoading,
}) {
  const { managedClient } = useSelector((state) => state.seller);
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const touchAction = (route, callback) => {
    setLoading(true);
    setIsMenuOpen(false);
    navigate(route);
    callback?.();
  };

  return (
    <NavbarMenu className="mt-8 gap-6 overflow-hidden bg-gradient-to-br from-primary to-white/20">
      <div className={`absolute -right-48 -top-10 -z-40 opacity-50 ${isMenuOpen && "hidden"}`}>
        <AwsImage type="logos" identify="logoBlack" className="rotate-12" />
      </div>

      {links.map(({ name, path }, i) => {
        return name === "productos" ? (
          <NavbarMenuItem
            onClick={() => touchAction()}
            className="flex w-[12rem] items-center gap-1.5 border-b-2  border-dark/50 p-1"
            key={i}
          >
            <i className="ri-arrow-right-s-line text-md  !text-secondary"></i>
            <ProductsTab
              index={i}
              className="font-primary text-lg font-semibold text-dark"
              categories={categories}
              setIsMenuOpen={setIsMenuOpen}
            />
          </NavbarMenuItem>
        ) : (
          <NavbarMenuItem onClick={() => touchAction(path)} className="w-fit" key={i}>
            <NavLink
              className={`flex h-full w-[12rem] items-center gap-1.5 border-b-2  border-dark/50 p-1 ${
                pathname.includes(name) && "pointer-events-none opacity-50"
              }`}
            >
              <i className="ri-arrow-right-s-line text-md  !text-secondary"></i>
              <p className="w-full font-primary text-lg uppercase text-dark">{name}</p>
            </NavLink>
          </NavbarMenuItem>
        );
      })}

      <div className="mt-10 flex items-center justify-evenly">
        {!id && !access_token && (
          <DefaultButton
            as={Link}
            onPress={() => touchAction("/sign-in")}
            className="bg-gradient-to-tl from-primary to-background shadow-xl"
            size="lg"
            startContent={<i className="ri-user-fill mr-2 text-lg" />}
          >
            INICIAR SESION
          </DefaultButton>
        )}

        {web_role === Number(import.meta.env.VITE_ADMIN_ROLE) && (
          <Button
            as={Link}
            onPress={() => touchAction("/dashboard/vendedores")}
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
              touchAction("#", handleManageClients);
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
          <>
            <Button
              as={Link}
              onPress={() => touchAction("/user/profile")}
              className={`bg-gradient-to-tl from-primary to-background shadow-xl ${
                pathname.includes("/user/profile") && "pointer-events-none to-dark/50 !opacity-50"
              }`}
              size="lg"
              isIconOnly
            >
              <i className={`ri-user-line text-2xl ${managedClient?.id && "animate-pulse text-green-600"}`} />
            </Button>
            <div className="relative flex items-center justify-center drop-shadow-xl">
              <Button
                as={Link}
                onPress={() => touchAction("/carrito")}
                className={`relative bg-gradient-to-br from-primary to-background transition hover:scale-110 ${
                  pathname === "/carrito" && "pointer-events-none to-dark/50 !opacity-50"
                }`}
                size="lg"
                isIconOnly
              >
                <i
                  className={`ri-shopping-cart-2-line text-2xl ${managedClient?.id && "animate-pulse text-green-600"}`}
                />
              </Button>
              {items?.length > 0 && (
                <span className="absolute -bottom-2 -right-3 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-background font-bold outline outline-primary">
                  <p>{items.length}</p>
                </span>
              )}
            </div>
          </>
        )}

        {id && access_token && (
          <Button
            as={Link}
            className={`relative bg-gradient-to-tl from-primary to-background shadow-xl transition hover:scale-110`}
            size="lg"
            isIconOnly
            onPress={() => touchAction("/", handleLogOut)}
          >
            <i className="ri-logout-circle-r-line text-2xl" />
          </Button>
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
  const { pathname } = useLocation();

  return (
    <Dropdown className={`bg-transparent shadow-none backdrop-blur-xl`} key={index}>
      <DropdownTrigger
        className={`font-primary text-sm font-bold text-background hover:cursor-pointer lg:text-[15px] ${
          pathname !== "/" && "text-dark"
        } ${pathname.includes("/productos") && "opacity-50"}  ${className}`}
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
              to="/productos/1"
            >
              <i className="ri-arrow-right-s-line text-lg font-bold text-secondary transition group-hover:text-white"></i>
              <p>TODOS</p>
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
