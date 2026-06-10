import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { ImWhatsapp } from "react-icons/im";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Roster", href: "/roster" },
  { label: "FAQ", href: "/faq" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Policies", href: "/policies" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 cursor-pointer">
            <img
              src="/favicon.png"
              alt="Worldwide FC Logo"
              className="h-12 w-auto"
              draggable={false}
            />
            <span className="hidden sm:block text-2xl font-heading font-bold uppercase leading-none">
              Worldwide<span className="text-accent"> FC</span>
            </span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={`relative text-xs font-bold uppercase tracking-widest transition-colors duration-200 cursor-pointer py-1
                  hover:text-accent
                  ${location === item.href
                    ? "text-accent after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent after:rounded-full"
                    : "text-primary-foreground/75"
                  }`}
              >
                {item.label}
              </a>
            </Link>
          ))}
        </div>

        {/* Socials & CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://www.instagram.com/worldwide_fc_yyc/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="text-primary-foreground/70 hover:text-accent transition-colors duration-200 cursor-pointer"
          >
            <FaInstagram size={18} />
          </a>
          <a
            href="https://wa.link/nv42mi"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="text-primary-foreground/70 hover:text-accent transition-colors duration-200 cursor-pointer"
          >
            <ImWhatsapp size={18} />
          </a>
          <Link href="/register">
            <Button
              variant="default"
              size="sm"
              className="bg-accent text-accent-foreground hover:bg-white hover:text-primary font-bold uppercase tracking-wider cursor-pointer transition-colors duration-200"
            >
              Join the Team
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-white/10 cursor-pointer"
              >
                <Menu size={22} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-primary border-l border-white/10 w-[280px]">
              <div className="flex flex-col gap-8 mt-10">
                <Link href="/">
                  <a
                    className="font-heading text-3xl font-bold uppercase text-center text-white block cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    Worldwide<span className="text-accent"> FC</span>
                  </a>
                </Link>
                <div className="flex flex-col">
                  {NAV_ITEMS.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <a
                        className={`text-sm font-bold uppercase tracking-widest text-center py-3 border-b border-white/10 transition-colors cursor-pointer
                          ${location === item.href ? "text-accent" : "text-primary-foreground/80 hover:text-accent"}`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </a>
                    </Link>
                  ))}
                  <Link href="/register">
                    <Button
                      className="w-full bg-accent text-accent-foreground font-bold uppercase mt-6 cursor-pointer"
                      onClick={() => setIsOpen(false)}
                    >
                      Join the Team
                    </Button>
                  </Link>
                </div>
                <div className="flex justify-center gap-6">
                  <a
                    href="https://www.instagram.com/worldwide_fc_yyc/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="text-primary-foreground hover:text-accent transition-colors cursor-pointer"
                  >
                    <FaInstagram size={22} />
                  </a>
                  <a
                    href="https://wa.link/nv42mi"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="WhatsApp"
                    className="text-primary-foreground hover:text-accent transition-colors cursor-pointer"
                  >
                    <ImWhatsapp size={22} />
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
