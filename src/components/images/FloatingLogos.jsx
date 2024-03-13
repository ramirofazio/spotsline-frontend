import AwsImage from "./AwsImage";

export default function FloatingLogos({
  logoColour = "Black",
  qty = 4,
  positions = ["-top-20 -left-40", "-right-40 -top-20", "-left-60 -bottom-10", "-right-60 -bottom-20"],
  size,
}) {
  const logos = [];
  const rotationIndexes = [
    "rotate-12",
    "-rotate-45",
    "rotate-45",
    "-rotate-12",
    "rotate-12",
    "-rotate-45",
    "rotate-45",
    "-rotate-12",
    "rotate-12",
    "-rotate-45",
    "rotate-45",
    "-rotate-12",
  ];

  for (let i = 0; i < qty; i++) {
    logos.push(
      <div key={i} className={`pointer-events-none absolute ${positions[i]}`}>
        <AwsImage
          identify={`logo${logoColour}`}
          type="logos"
          className={`${rotationIndexes[i]} w-80 !opacity-50 lg:w-[40vw] ${size}`}
        />
      </div>
    );
  }

  return <div>{logos}</div>;
}
