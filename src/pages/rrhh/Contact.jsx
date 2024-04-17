import { Input } from "@nextui-org/react";
import { useState } from "react";
import { BasicInput } from "src/components";

export function Contact() {

  const [emailData, setEmailData] = useState();

  return (
    <form className="border-2" action="">
      <strong><h1>DEJANOS TU MENSAJE</h1></strong>
      <BasicInput  name="name" label="Nombre y Apellido" labelClass="text-black ml-2" isRequired={true}/>
      <BasicInput  name="email" label="Nombre y Apellido" labelClass="text-black ml-2" isRequired={true}/>
      <BasicInput  name="name" label="Nombre y Apellido" labelClass="text-black ml-2" isRequired={true}/>

    </form>
  );
}