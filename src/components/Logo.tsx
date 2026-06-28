import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo.svg"
      alt="Aioncy"
      width={160}
      height={54}
      className="h-10 w-auto shrink-0"
      priority
    />
  );
}
