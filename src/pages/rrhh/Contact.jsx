import { Textarea } from "@nextui-org/react";
import { useState } from "react";
import { BasicInput, DefaultButton } from "src/components";
import { toast } from "sonner";
import { APISpot } from "src/api";
import { getOfStorage, saveInStorage } from "src/utils/localStorage";
import { isValidEmail } from "src/utils/validation";
import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight } from "src/styles/framerVariants";

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
          target.value = "";
          toast.error("el archivo es muy grande");
          return prev;
        } else return { ...prev, file };
      } else if (target.name === "email") {
        setEmailErr(isValidEmail(target.value));
        return { ...prev, [target.name]: target.value };
      } else return { ...prev, [target.name]: target.value };
    });
  }

  return (
    <section className="flex flex-col gap-10 p-8 px-10 md:items-start lg:flex-row">
      <motion.article
        {...fadeInLeft()}
        className="mx-auto w-full text-center md:flex md:!min-h-[700px] md:flex-1 md:flex-col md:justify-between md:p-3"
      >
        <span className="p-2 md:p-0 md:text-justify">
          <strong>
            <p className="mb-2 text-center text-lg font-bold text-dark md:text-left md:text-2xl">Recursos Humanos</p>
          </strong>
          <p className="lg:text-lg">
            La esencia de nuestro trabajo es <strong>conectar</strong> con los clientes y sus
            <strong> necesidades</strong>. Si te gustan los <strong>desafíos</strong>, tenés ganas de aprender y querés
            formar parte de <strong>nuestro equipo</strong>, adjuntá tu <strong>CV</strong> o escribinos a{" "}
            <u
              className="cursor-pointer transition hover:opacity-50"
              onClick={() => {
                navigator.clipboard.writeText("rrhh@spotsline.com.ar");
                toast.success("email copiado en portapapeles");
              }}
            >
              rrhh@spotsline.com.ar
              <i className="ri-file-copy-fill yellowGradient icons h-4 w-4" />
            </u>
          </p>
        </span>
        <div className="hidden items-center justify-center overflow-hidden rounded-md border-2 border-primary text-right md:flex">
          <iframe
            className="min-h-[500px] w-full"
            id="gmap_canvas"
            loading="lazy"
            src="https://maps.google.com/maps?q=Spotsline+Srl%2C+CGA%2C+Pedro+Ignacio+de+Rivera+5915%2C+B1606+Munro%2C+Provincia+de+Buenos+Aires&t=&z=15&ie=UTF8&iwloc=&output=embed"
            title="Google Maps"
          ></iframe>
        </div>
      </motion.article>

      <motion.form {...fadeInRight()} className="w-full md:flex-1 md:p-3" onSubmit={(e) => handleSubmit(e)}>
        <strong>
          <p className="mb-2 text-center text-lg font-bold text-dark md:text-left md:text-2xl">Dejanos un mensaje</p>
        </strong>
        <article className="mt-4 flex flex-col gap-3">
          <BasicInput
            startContentIcon="ri-user-fill text-xl text-secondary"
            value={emailData?.name}
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
            startContentIcon="ri-mail-fill text-xl text-secondary"
            value={emailData?.email}
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
            startContentIcon="ri-file-text-fill text-xl text-secondary"
            value={emailData?.subject}
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
            value={emailData?.message}
            onChange={handleChange}
            isRequired
            name="message"
            label="Mensaje"
            maxLength={1020}
            classNames={{
              label: "text-black ml-2 text-md",
              input: "bg-primary/10 focus:bg-primary/30 min-h-[180px] p-2 md:placeholder:text-lg",
              inputWrapper: "bg-primary/30 p-0",
            }}
            color="bg-red-500"
            labelPlacement="outside"
            placeholder="Ingrese el mensaje que desea enviar"
            className="min-h-full rounded-md transition"
          />
          <label
            htmlFor="upload-avatar"
            className={`relative mx-auto mt-4 flex w-full max-w-full cursor-pointer items-center gap-2 overflow-hidden rounded-md border-2 bg-primary/30 px-4 py-2 transition hover:bg-secondary/20 ${
              emailData?.file && " border-green-600"
            }`}
          >
            <i
              className={`text-2xl font-bold text-black ${
                emailData?.file ? "ri-check-line text-green-600" : "ri-file-upload-line"
              }  `}
            ></i>
            <p className="text-red-500">*</p>
            <p className="overflow-hidden text-center">{emailData?.file ? emailData?.file.name : "Cargue su CV"}</p>
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
          {!emailData?.file ? (
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
            isDisabled={loading || !emailData?.message || (!emailData?.file && true) || emailErr}
            className="mx-auto my-3"
            type="submit"
            onDisabled="opacity-30"
          >
            Enviar solicitud
          </DefaultButton>
        </article>
      </motion.form>
    </section>
  );
}
