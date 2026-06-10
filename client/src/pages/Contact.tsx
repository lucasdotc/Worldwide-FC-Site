import { FaInstagram } from "react-icons/fa";
import { ImWhatsapp } from "react-icons/im";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
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

const CONTACT_INFO = [
  {
    icon: ImWhatsapp,
    label: "WhatsApp",
    value: "+1 (587) 500-4823",
    href: "https://wa.link/nv42mi",
    external: true,
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    value: "@worldwide_fc_yyc",
    href: "https://www.instagram.com/worldwide_fc_yyc/",
    external: true,
  },
];

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      if (!response.ok) {
        throw new Error(data.details || data.error || "Failed to send message");
      }

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to send message. Please try again.";
      toast({
        title: "Something went wrong",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="bg-primary py-20 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-px w-10 bg-accent/60" />
          <span className="text-accent text-xs font-bold tracking-[0.25em] uppercase">Reach Out</span>
          <span className="h-px w-10 bg-accent/60" />
        </div>
        <h1 className="text-5xl md:text-7xl font-heading font-black text-white uppercase tracking-tight">
          Contact <span className="text-accent">Us</span>
        </h1>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-heading font-bold text-primary mb-3 uppercase">
              Get in Touch
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-sm">
              Have a question about joining, training, or anything else? Reach us through any of the channels below or fill out the form.
            </p>

            <div className="space-y-4">
              {CONTACT_INFO.map(({ icon: Icon, label, value, href, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 bg-white border border-border hover:border-accent hover:shadow-sm transition-all duration-200 group cursor-pointer"
                >
                  <div className="bg-accent/10 p-3 text-primary group-hover:bg-accent group-hover:text-white transition-colors duration-200 rounded-sm">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
                    <p className="font-medium text-foreground group-hover:text-accent transition-colors duration-200">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-10 p-6 bg-primary text-primary-foreground">
              <h3 className="font-heading text-lg font-bold uppercase mb-2">Looking to Join?</h3>
              <p className="text-primary-foreground/70 text-sm leading-relaxed mb-4">
                Registration requests can be submitted directly through our registration page.
              </p>
              <a
                href="/register"
                className="inline-block bg-accent text-accent-foreground text-xs font-bold uppercase tracking-widest px-5 py-2.5 hover:bg-white hover:text-primary transition-colors duration-200 cursor-pointer"
              >
                Registration Request →
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 border border-border shadow-sm">
            <h2 className="text-2xl font-heading font-bold text-primary mb-6 uppercase">Send a Message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase tracking-wide">First Name</FormLabel>
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
                        <FormLabel className="text-xs font-bold uppercase tracking-wide">Last Name</FormLabel>
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
                      <FormLabel className="text-xs font-bold uppercase tracking-wide">Email</FormLabel>
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
                      <FormLabel className="text-xs font-bold uppercase tracking-wide">Subject</FormLabel>
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
                      <FormLabel className="text-xs font-bold uppercase tracking-wide">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="How can we help you?"
                          className="min-h-[140px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground font-bold uppercase tracking-widest py-5 transition-colors duration-200 disabled:opacity-50 cursor-pointer"
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
