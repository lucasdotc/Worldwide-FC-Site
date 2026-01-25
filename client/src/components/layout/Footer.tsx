export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 border-t border-accent/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-heading text-3xl font-bold uppercase italic">
              Worldwide<span className="text-accent">FC</span>
            </h3>
            <p className="text-primary-foreground/70 max-w-xs mx-auto md:mx-0">
              Uniting players from across the globe through the beautiful game. Professional training, competitive matches, and a family atmosphere.
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
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-heading text-xl font-bold uppercase tracking-wide text-accent">Get in Touch</h4>
            <ul className="space-y-2 text-primary-foreground/70">
              <li>info@worldwidefc.com</li>
              <li>+1 (555) 123-4567</li>
              <li>Los Angeles, CA</li>
            </ul>
            <div className="flex justify-center md:justify-start gap-4 pt-2">
               {/* Icons could go here again if needed */}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} Worldwide FC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
