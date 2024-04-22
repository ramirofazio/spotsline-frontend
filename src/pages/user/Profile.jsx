import { Avatar, Button, Divider, Spinner } from "@nextui-org/react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "sonner";
import { APISpot } from "src/api";
import ProfileData from "./ProfileData";
import ProfileOrders from "./ProfileOrders";
import { getOfStorage, saveInStorage } from "src/utils/localStorage";

const selectButtonsData = [
  { name: "MI PERFIL", startIcon: "user", component: <ProfileData /> },
  { name: "MIS COMPRAS", startIcon: "shopping-cart-2", component: <ProfileOrders /> },
];

export function Profile() {
  //TODO crear avatar en tabla CLIENTE

  const { userData } = useLoaderData();
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSection, setSelectedSection] = useState(() => {
    const local = getOfStorage("profileSelectedSection");
    if (local) {
      return local;
    }

    return "MI PERFIL";
  });

  async function updateAvatar() {
    try {
      setLoading(true);
      await APISpot.user.updateAvatar({ formData: avatar.formData, userId: userData.id, web_role: "client" });
      toast.success("Avatar actualizado!");
      userData.avatar = avatar.url;
      setAvatar(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const handleAvatar = ({ target }) => {
    const formData = new FormData();
    formData.append("file", target.files[0]);
    const newAvatar = URL.createObjectURL(target.files[0]);
    setAvatar({ url: newAvatar, formData: formData });
  };

  const handleSelect = (name) => {
    setSelectedSection(name);
    saveInStorage("profileSelectedSection", name);
  };

  return (
    <main className="pt-16 md:pt-20">
      <header className="relative hidden flex-col items-center justify-center md:flex md:h-40">
        <h1 className="text-2xl font-bold lg:text-3xl">MI CUENTA</h1>
        <Divider className="absolute bottom-0 mx-auto h-[3px] rounded-xl bg-gradient-to-r from-primary to-yellow-600" />
      </header>
      <div className="md:grid md:grid-cols-2">
        <section className="flex flex-col items-center justify-start gap-2 p-10 pt-10">
          <div className="relative ">
            <Avatar
              src={avatar ? avatar.url : userData.avatar}
              name={userData.fantasyName}
              className="mx-auto h-44 w-44 "
              classNames={{ base: "bg-white" }}
            />

            <Button
              isIconOnly
              className=" absolute bottom-0 left-0 rounded-full bg-gradient-to-r from-primary to-yellow-200 font-bold text-black  "
              startContent={
                <div className={`relative ${loading && "hidden"}`}>
                  <label htmlFor="upload-avatar" className=" cursor-pointer rounded px-4 py-2 font-bold">
                    <i className={`ri-pencil-line icons text-2xl font-bold text-black`}></i>

                    <input
                      title="Cargar imagenes"
                      accept="image/*"
                      id="upload-avatar"
                      type="file"
                      onChange={handleAvatar}
                      className="invisible absolute right-0 top-0 h-full w-full border-2"
                    />
                  </label>
                </div>
              }
              isLoading={loading}
              loadingContent={
                <Spinner color="primary" size="lg" className="z-20 aspect-square h-40 rounded-2xl bg-dark/60" />
              }
            />

            {avatar && (
              <span className="absolute -right-11 bottom-11 flex animate-pulse flex-col gap-3">
                <Button
                  onPress={() => updateAvatar()}
                  isIconOnly
                  className=" rounded-full bg-green-500 font-bold text-black  "
                  startContent={<i className="ri-check-line text-xl text-white"></i>}
                />
                <Button
                  onPress={() => setAvatar(null)}
                  isIconOnly
                  className="animate-pulse  rounded-full bg-red-500 font-bold text-black  "
                  startContent={<i className="ri-close-line text-xl text-white"></i>}
                />
              </span>
            )}
          </div>
          <h1 className="underliner mt-10 rounded-full bg-gradient-to-r from-primary to-yellow-200 p-2 px-4 text-center font-bold md:text-xl lg:w-80">
            {userData.fantasyName}
          </h1>

          <div className="mt-10 flex flex-col items-center justify-around gap-3">
            {selectButtonsData.map(({ name, startIcon }) => (
              <Button
                key={name}
                onPress={() => handleSelect(name)}
                startContent={<i className={`ri-${startIcon}-fill text-xl text-dark transition`} />}
                endContent={
                  <i
                    className={`ri-arrow-right-s-line text-xl text-dark transition ${
                      selectedSection === name && "rotate-90"
                    }`}
                  />
                }
                className={`flex w-60 justify-between bg-gradient-to-r from-primary to-yellow-200 py-8 text-lg font-bold transition lg:w-80 lg:text-xl ${
                  selectedSection === name && "from-dark/20 to-dark/20"
                }`}
              >
                {name}
              </Button>
            ))}
          </div>
          <Divider className="mt-10 h-[3px] w-[60vw] rounded-xl bg-gradient-to-r from-primary to-yellow-600 md:hidden" />
        </section>
        <section className="md:col-start-2">
          {selectButtonsData.map(({ name, component }, index) => (
            <div key={index}>{name === selectedSection && component}</div>
          ))}
        </section>
        <Divider className="mx-auto mb-10 h-[3px] w-[60vw] rounded-xl bg-gradient-to-r from-primary to-yellow-600 md:hidden" />
      </div>
    </main>
  );
}
