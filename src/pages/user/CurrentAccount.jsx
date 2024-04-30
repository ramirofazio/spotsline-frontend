import { useLoaderData } from "react-router-dom";

export default function CurrentAccount() {
  const { userCA } = useLoaderData();

  console.log(userCA);

  return <main>CC</main>;
}
