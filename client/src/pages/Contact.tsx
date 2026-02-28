import { Mail } from "lucide-react";
import { ImWhatsapp } from "react-icons/im";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  const API = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        // If response is not valid JSON, handle it
        console.error("Invalid JSON response:", response.statusText);
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      if (!response.ok) {
        throw new Error(data.details || data.error || "Failed to send message");
      }

      toast({
        title: "Success!",
        description: "Your message has been sent. We'll get back to you soon!",
      });

      form.reset();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to send message. Please try again.";
      console.error("Contact form error:", errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

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
                <div className="bg-accent/10 p-3 rounded-full text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg uppercase">Email</h3>
                  <p className="text-muted-foreground">philliphanoski@worldwidefc.ca<br />tomasmonroy@worldwidefc.ca<br />coachlucas@worldwidefc.ca</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-3 rounded-full text-primary">
                  <ImWhatsapp size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg uppercase">WhatsApp</h3>
                  <p className="text-muted-foreground">+1 (587) 500-4823</p>
                  <p className="text-muted-foreground">+1 (587) 834 0475</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 border shadow-sm">
            <h2 className="text-3xl font-heading font-bold text-primary mb-6 uppercase italic">Send a Message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold uppercase tracking-wide">First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-bold uppercase tracking-wide">Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-bold uppercase tracking-wide">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-bold uppercase tracking-wide">Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="General Inquiry" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-bold uppercase tracking-wide">Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="How can we help you?" className="min-h-[150px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-widest py-6 disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
