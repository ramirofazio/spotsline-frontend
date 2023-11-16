import { Input } from "components/form/index";
import { useEffect, useState } from "react";

export function SearchInput() {
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log(search);
  }, [search]);

  return (
    <Input
      icon="ri-search-2-line font-bold"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder={"BÚSQUEDA POR CÓDIGO O PALABRA CLAVE"}
    />
  );
}
