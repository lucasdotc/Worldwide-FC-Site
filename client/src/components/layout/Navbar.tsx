import { Link, useLocation } from "wouter";
import { Menu, X, Instagram, Phone } from "lucide-react";
import { ImWhatsapp } from "react-icons/im";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 font-heading text-3xl font-bold uppercase italic tracking-tighter hover:text-accent transition-colors">
            Worldwide<span className="text-accent">FC</span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={`text-sm font-medium uppercase tracking-widest transition-colors hover:text-accent ${
                  location === item.href ? "text-accent border-b-2 border-accent" : "text-primary-foreground/80"
                }`}
              >
                {item.label}
              </a>
            </Link>
          ))}
        </div>

        {/* Socials & CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://www.instagram.com/worldwide_fc_yyc/"
            target="_blank"
            rel="noreferrer"
            className="text-primary-foreground/80 hover:text-accent transition-colors"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://wa.link/nv42mi"
            target="_blank"
            rel="noreferrer"
            className="text-primary-foreground/80 hover:text-accent transition-colors"
          >
            <ImWhatsapp size={20} />
          </a>
          <Link href="/register">
            <Button variant="default" className="bg-accent text-accent-foreground hover:bg-white hover:text-primary font-bold uppercase tracking-wider">
              Join the Team
            </Button>
          </Link>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-primary border-l-primary-foreground/10 w-[300px]">
              <div className="flex flex-col gap-8 mt-10">
                <Link href="/">
                  <a className="font-heading text-4xl font-bold uppercase italic text-center text-white" onClick={() => setIsOpen(false)}>
                    Worldwide<span className="text-accent">FC</span>
                  </a>
                </Link>
                <div className="flex flex-col gap-4">
                  {NAV_ITEMS.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <a
                        className={`text-lg font-medium uppercase text-center py-2 border-b border-primary-foreground/10 ${
                          location === item.href ? "text-accent" : "text-primary-foreground"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </a>
                    </Link>
                  ))}
                  <Link href="/register">
                    <Button className="w-full bg-accent text-accent-foreground font-bold uppercase mt-4" onClick={() => setIsOpen(false)}>
                      Join the Team
                    </Button>
                  </Link>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <a href="https://www.instagram.com/worldwide_fc_yyc/" className="text-primary-foreground hover:text-accent"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Instagram size={24} />
                  </a>
                  <a href="https://wa.link/nv42mi" className="text-primary-foreground hover:text-accent"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ImWhatsapp size={24} />
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
