import { ImWhatsapp } from "react-icons/im";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 border-t border-accent/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <img
                src="/favicon.png"
                alt="Worldwide FC Logo"
                className="h-14 w-auto"
                draggable={false}
              />
              <h3 className="font-heading text-3xl font-bold uppercase">
                Worldwide<span className="text-accent"> FC</span>
              </h3>
            </div>

            <p className="text-primary-foreground/70 max-w-xs mx-auto md:mx-0">
              Uniting players from across the globe through the beautiful game.
              Technical and tactical training, competitive matches, and a family atmosphere.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-xl font-bold uppercase tracking-wide text-accent">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-accent transition-colors">Contact</a></li>
              <li><a href="/faq" className="hover:text-accent transition-colors">FAQ</a></li>
              <li><a href="/register" className="hover:text-accent transition-colors">Join the Squad</a></li>
              <li><a href="/policies" className="hover:text-accent transition-colors">Club Policies</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-heading text-xl font-bold uppercase tracking-wide text-accent">Get in Touch</h4>
            <a
              href="https://wa.link/nv42mi"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors"
            >
              <ImWhatsapp size={24} />
            </a>
          </div>
        </div>

        {/* Sponsors Section */}
        <div className="mt-12 pt-8 border-t border-border">
          

          <div className="mt-6 flex flex-wrap justify-center items-center gap-6">
            <img
              src="/carvajal_resized.png"
              alt="Carvajal Trims"
              className="h-[165px] w-auto object-contain pointer-events-none"
            />
            <img
              src="/cmp_bk.webp"
              alt="CMP Auto"
              className="h-12 w-auto object-contain pointer-events-none"
            />
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} Worldwide FC. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
