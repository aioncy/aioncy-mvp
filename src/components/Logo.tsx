import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo.svg"
      alt="Aioncy"
      width={160}
      height={54}
      className="h-10 w-[160px] lg:w-auto shrink-0 -ml-5 lg:ml-0"
      priority
    />
  );
}
