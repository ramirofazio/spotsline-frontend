import { Textarea } from "@nextui-org/react";
import { useState } from "react";
import { BasicInput } from "src/components";
import { Input } from "postcss";

export function Contact() {
  const [emailData, setEmailData] = useState({});

  return (
    <form className="border-2" action="">
      <strong>
        <h1 className="mx-auto w-fit">DEJANOS TU MENSAJE</h1>
      </strong>
      <article className="mt-4 flex flex-col gap-3">
        <BasicInput name="name" label="Nombre y Apellido" labelClass="text-black ml-2 " isRequired={true} />
        <BasicInput name="email" label="Email" labelClass="text-black ml-2" isRequired={true} />
        <BasicInput name="name" label="Asunto" labelClass="text-black ml-2" isRequired={false} />
        <Textarea
          isRequired
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

        <input />
      </article>
      <button type="submit">Enviar solicitud</button>
    </form>
  );
}
