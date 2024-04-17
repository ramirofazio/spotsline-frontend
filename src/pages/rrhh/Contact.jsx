import { Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BasicInput, DefaultButton } from "src/components";
import { toast } from "sonner";
import { APISpot } from "src/api";

export function Contact() {
  const [emailData, setEmailData] = useState({ file: null });
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("se subioooooo");
      await APISpot.mail.sendRrhhRequest(emailData);
      toast.success("Se envio email con sus datos!");
    } catch (err) {
      toast.error("Error" + err.message);
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
      } else return { ...prev, [target.name]: target.value };
    });
  }
  useEffect(() => {
    console.log(emailData);
  }, [emailData]);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <strong>
        <h1 className="mx-auto w-fit">DEJANOS TU MENSAJE</h1>
      </strong>
      <article className="mt-4 flex flex-col gap-3">
        <BasicInput
          onChange={handleChange}
          name="name"
          label="Nombre y Apellido"
          labelClass="text-black ml-2 "
          isRequired={true}
        />
        <BasicInput onChange={handleChange} name="email" label="Email" labelClass="text-black ml-2" isRequired={true} />
        <BasicInput
          onChange={handleChange}
          name="subject"
          label="Asunto"
          labelClass="text-black ml-2"
          isRequired={false}
        />
        <Textarea
          onChange={handleChange}
          isRequired
          name="message"
          label="Su mensaje"
          classNames={{
            label: "text-black ml-2 text-md",
            input: "bg-primary/30 rounded-lg min-h-[180px] p-2",
            inputWrapper: "bg-primary/30 p-0 ",
          }}
          color="bg-red-500"
          labelPlacement="outside"
          placeholder="Escriba el mensaje que desea enviar"
          className="min-h-full max-w-lg rounded-full"
        />
        <label
          htmlFor="upload-avatar"
          className={`relative mx-auto mt-4 flex w-fit max-w-full cursor-pointer items-center gap-2 overflow-hidden rounded border-2 px-4 py-2 ${
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
              toast.info("se elimino el CV previo");
            }}
            className="ri-close-circle-line mx-auto text-4xl text-red-500 hover:opacity-30"
          ></i>
        )}

        <DefaultButton
          isLoading={loading}
          className="mx-auto my-3 w-fit"
          type="submit"
          onDisabled="opacity-30"
          isDisabled={!emailData.message || (!emailData.file && true)}
        >
          <p>Enviar solicitud</p>
        </DefaultButton>
      </article>
    </form>
  );
}
