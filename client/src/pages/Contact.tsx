import { Mail} from "lucide-react";
import { ImWhatsapp } from "react-icons/im";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
       <div className="bg-primary py-16 text-center">
        <h1 className="text-5xl md:text-7xl font-heading font-black text-white uppercase italic tracking-tighter">
          Contact <span className="text-accent">Us</span>
        </h1>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-heading font-bold text-primary mb-8 uppercase italic">Get in Touch</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-3 rounded-full text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg uppercase">Email</h3>
                  <p className="text-muted-foreground">philliphanoski@worldwidefc.com<br/>tomasmonroy@worldwidefc.com<br/>coachlucas@worldwidefc.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-3 rounded-full text-primary">
                  <ImWhatsapp size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg uppercase">WhatsApp</h3>
                  <p className="text-muted-foreground">+1 (587) 500-4823</p>
                </div>
              </div>

              
            </div>

            {/* Map Placeholder - Temporarily disabled
            <div className="mt-12 h-64 bg-muted w-full rounded-sm flex items-center justify-center border-2 border-border">
              <span className="text-muted-foreground font-heading uppercase font-bold text-xl">Map Integration Placeholder</span>
            </div>
            */}
          </div>

          {/* Form */}
          <div className="bg-white p-8 border shadow-sm">
            <h2 className="text-3xl font-heading font-bold text-primary mb-6 uppercase italic">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wide">First Name</label>
                  <Input placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wide">Last Name</label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wide">Email</label>
                <Input type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wide">Subject</label>
                <Input placeholder="General Inquiry" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wide">Message</label>
                <Textarea placeholder="How can we help you?" className="min-h-[150px]" />
              </div>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-widest py-6">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
