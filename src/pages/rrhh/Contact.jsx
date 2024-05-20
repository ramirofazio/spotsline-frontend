import { Textarea } from "@nextui-org/react";
import { useState } from "react";
import { BasicInput, DefaultButton } from "src/components";
import { toast } from "sonner";
import { APISpot } from "src/api";
import { getOfStorage, saveInStorage } from "src/utils/localStorage";
import { isValidEmail } from "src/utils/validation";
import { motion } from "framer-motion";

export function Contact() {
  const _defaultData = { name: "", email: "", subject: "", message: "", file: null };

  const [emailData, setEmailData] = useState(_defaultData);
  const [emailErr, setEmailErr] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const emailsApllied = getOfStorage("emailsApllied");
      if (emailsApllied && emailsApllied[emailData.email]) {
        throw new Error("Usted ya aplico anteriormente");
      }
      setLoading(true);
      await APISpot.mail.sendRrhhRequest(emailData);

      saveInStorage("emailsApllied", {
        ...emailsApllied,
        [emailData.email]: true,
      });
      toast.success("Se envio email con sus datos!");
      setEmailData(_defaultData);
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function handleChange({ target }) {
    setEmailData((prev) => {
      if (target.name === "file") {
        const file = target.files[0];
        const sizeLimit = 40 * 1024 * 1024;
        if (file.size >= sizeLimit) {
          toast.error("el archivo es muy grande");
        } else return { ...prev, file };
      } else if (target.name === "email") {
        setEmailErr(isValidEmail(target.value));
        return { ...prev, [target.name]: target.value };
      } else return { ...prev, [target.name]: target.value };
    });
  }

  return (
    <section className="flex flex-col gap-10 px-6">
      <article className="">
        <motion.h2 className=" mt-4 w-fit text-4xl font-bold tracking-wider text-black drop-shadow-xl lg:text-5xl">
          RECURSOS <br /> <span className="text-primary">HUMANOS</span>
        </motion.h2>
        <span className="p-2">
          <strong>
            <p className="">¿Queres unirte?</p>
          </strong>
          <p>
            En <strong>Spotsline</strong> somos un gran equipo humano y profesional.
          </p>
          <p>
            La esencia de nuestro trabajo es <strong>conectar</strong> con los clientes y sus
            <strong>necesidades</strong>.
          </p>
          <p>
            Si te gustan los <strong>desafíos</strong>, tenés ganas de aprender y querés formar parte de
            <strong>nuestro equipo</strong>, adjuntá tu <strong>CV</strong> o escribinos a <u>rrhh@spotsline.com.ar</u>
          </p>
        </span>
      </article>

      <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
        <strong>
          <h1 className="mx-auto w-fit text-xl">DEJANOS TU MENSAJE</h1>
        </strong>
        <article className="mt-4 flex flex-col gap-3">
          <BasicInput
            value={emailData.name}
            onChange={handleChange}
            placeholder="Ingrese su nombre completo"
            name="name"
            variant="flat"
            label="Nombre y Apellido"
            labelClass="text-black ml-2 "
            isRequired={true}
            maxLength={65}
          />

          <BasicInput
            value={emailData.email}
            onChange={handleChange}
            placeholder="Ingrese su email"
            name="email"
            label="Email"
            variant="flat"
            labelClass="text-black ml-2"
            isRequired={true}
            isInvalid={Boolean(emailErr)}
            errorMessage={emailErr}
            maxLength={70}
          />
          <BasicInput
            value={emailData.subject}
            onChange={handleChange}
            placeholder="Ingrese un asunto"
            name="subject"
            label="Asunto"
            variant="flat"
            labelClass="text-black ml-2"
            className
            isRequired={false}
          />
          <Textarea
            variant="underlined"
            value={emailData.message}
            onChange={handleChange}
            isRequired
            name="message"
            label="Mensaje"
            maxLength={1020}
            classNames={{
              label: "text-black ml-2 text-md",
              input: "bg-primary/10 focus:bg-primary/30 rounded-md min-h-[180px] p-2 md:placeholder:text-lg",
              inputWrapper: "bg-primary/30 p-0 ",
            }}
            color="bg-red-500"
            labelPlacement="outside"
            placeholder="Ingrese el mensaje que desea enviar"
            className="min-h-full rounded-full"
          />
          <label
            htmlFor="upload-avatar"
            className={`relative mx-auto mt-4 flex w-full max-w-full cursor-pointer items-center gap-2 overflow-hidden rounded-md border-2 bg-primary/30 px-4 py-2 hover:bg-secondary/20 ${
              emailData.file && " border-green-600"
            }`}
          >
            <i
              className={`text-2xl font-bold text-black ${
                emailData.file ? "ri-check-line text-green-600" : "ri-file-upload-line"
              }  `}
            ></i>
            <p className="text-red-500">*</p>
            <p className="overflow-hidden text-center">{emailData.file ? emailData.file.name : "Cargue su CV"}</p>
            <input
              name="file"
              onChange={handleChange}
              title="Cargar imagenes"
              accept="application/*"
              id="upload-avatar"
              type="file"
              className={`invisible absolute right-0 top-0 h-full w-full border-2 `}
            />
          </label>
          {!emailData.file ? (
            <p className="mx-auto">(maximo 40mb)</p>
          ) : (
            <i
              onClick={() => {
                setEmailData((...prev) => {
                  return { ...prev, file: null };
                });
                toast.info("Se elimino el CV previo");
              }}
              className="ri-close-circle-line mx-auto text-4xl text-red-500 hover:opacity-30"
            ></i>
          )}

          <DefaultButton
            isLoading={loading}
            isDisabled={loading || !emailData.message || (!emailData.file && true) || emailErr}
            className="mx-auto my-3"
            type="submit"
            onDisabled="opacity-30"
          >
            Enviar solicitud
          </DefaultButton>
        </article>
      </form>
    </section>
  );
}
