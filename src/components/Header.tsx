import Link from "next/link";
import Button from "./Button";

export default function Header() {
  return (
    <header className="border-b border-border-light/40 backdrop-blur-md bg-white/75 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-utility-bluishpurple to-aioncy flex items-center justify-center font-bold text-white shadow-lg shadow-aioncy/20">
            A
          </div>
          <span className="text-xl font-bold tracking-tight text-neutral-black">
            Aioncy<span className="text-aioncy">.</span>
          </span>
        </div>
        <nav className="hidden lg:flex items-center gap-8">
          <a href="#features" className="text-body-re-400 text-placeholder hover:text-neutral-black transition-colors">
            Features
          </a>
          <a href="#demo" className="text-body-re-400 text-placeholder hover:text-neutral-black transition-colors">
            Agent Lab
          </a>
          <a href="#pricing" className="text-body-re-400 text-placeholder hover:text-neutral-black transition-colors">
            Pricing
          </a>
          <Link href="/review" className="text-body-re-400 text-aioncy hover:text-utility-bluishpurple transition-colors font-medium">
            Style Guide Review
          </Link>
        </nav>
        <div>
          <Button variant="dark" size="small" className="rounded-full">
            Launch Console
          </Button>
        </div>
      </div>
    </header>
  );
}
