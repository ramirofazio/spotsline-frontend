import { Checkbox, CheckboxGroup } from "@nextui-org/react";

// Tiene una api muy amigable los componentes, todos hechos con tailwind y react
// Cada componente tiene sus "props" para cambiar estado o manejar logica
// Tambien tiene sus "custom styles" donde podes cambiar los estilos de todo un componente de una forma bastante clean

// ? DOCS: https://nextui.org/docs/components/checkbox-group#custom-styles

export function Demo() {
  return (
    <CheckboxGroup defaultValue={["2"]}>
      <Checkbox value="1">Zaracatunga</Checkbox>
      <Checkbox value="2">Tuki</Checkbox>
      <Checkbox className="bg-red-500" value="3">
        Alpaca
      </Checkbox>
    </CheckboxGroup>
  );
}
