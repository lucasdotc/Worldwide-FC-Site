import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { X } from "lucide-react";
import { useState } from 'react';

const EMAILJS_SERVICE_ID = "service_i4ltsyg";
//const EMAILJS_SERVICE_ID = "service_l4fecgr";
const EMAILJS_TEMPLATE_ID = "template_ekhogck";
const EMAILJS_PUBLIC_KEY = "hayhFKcuW2xaQ3XuG";



const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Phone number is too short." }),
  dob: z.string().min(1, { message: "Date of birth is required." }),
  position: z.string().min(1, { message: "Please select a preferred position." }),
  experience: z.string(),
  experienceMedia: z
    .array(
      z.object({
        name: z.string(),
        type: z.string(),
        size: z.number(),
      })
    )
    .optional(),
});

export default function Register() {
  const [experienceFiles, setExperienceFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      position: "",
      experience: "",
      experienceMedia: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    //console.log(values);
    const formData = new FormData();

    // text fields
    formData.append("fullName", values.fullName);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("dob", values.dob);
    formData.append("position", values.position);
    formData.append("experience", values.experience || "");

    experienceFiles.forEach((file) => {
      formData.append("media", file);
    });

    const res = await fetch("http://localhost:5001/submit", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Backend failed");
    
    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        dob: values.dob,
        position: values.position,
        experience: values.experience || "N/A",
      },
      EMAILJS_PUBLIC_KEY
    );
    toast({
      title: "Registration Submitted!",
      description: "We've received your details. A coach will contact you shortly.",
    });
    form.reset();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-16 text-center">
        <h1 className="text-5xl md:text-7xl font-heading font-black text-white uppercase italic tracking-tighter">
          Join the <span className="text-accent">Squad</span>
        </h1>
        <p className="text-white/70 mt-4 text-lg">Take the first step towards glory.</p>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="bg-white p-8 md:p-12 border shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 -mr-16 -mt-16 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 -ml-16 -mb-16 rounded-full blur-3xl"></div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 relative z-10">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase font-bold tracking-wide">Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="bg-muted/30 border-2 focus-visible:ring-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase font-bold tracking-wide">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} className="bg-muted/30 border-2 focus-visible:ring-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase font-bold tracking-wide">Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="(555) 123-4567" {...field} className="bg-muted/30 border-2 focus-visible:ring-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase font-bold tracking-wide">Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} className="bg-muted/30 border-2 focus-visible:ring-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase font-bold tracking-wide">Preferred Position</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-muted/30 border-2 focus-visible:ring-primary">
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
                          <SelectItem value="defender">Defender</SelectItem>
                          <SelectItem value="midfielder">Midfielder</SelectItem>
                          <SelectItem value="forward">Forward</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase font-bold tracking-wide">Previous Experience</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your previous clubs, achievements, or playing history..."
                        className="resize-none bg-muted/30 border-2 focus-visible:ring-primary min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Brief overview of your soccer career.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experienceMedia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase font-bold tracking-wide">Photos/Videos</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        className="bg-muted/30 border-2 focus-visible:ring-primary"
                        onChange={(e) => {
                          const files = Array.from(e.target.files ?? []);
                          setExperienceFiles(files); 
                          field.onChange(
                            files.map((f) => ({ name: f.name, type: f.type, size: f.size }))
                          );
                        }}

                        data-testid="input-experience-media"
                      />
                    </FormControl>
                    {(field.value?.length ?? 0) > 0 ? (
                      <div className="mt-3 space-y-2" data-testid="list-experience-media">
                        {field.value!.map((f, idx) => (
                          <div
                            key={`${f.name}-${idx}`}
                            className="flex items-center justify-between gap-3 rounded-md border bg-muted/20 px-3 py-2"
                            data-testid={`row-experience-media-${idx}`}
                          >
                            <div className="min-w-0">
                              <div className="truncate text-sm font-medium text-primary" data-testid={`text-experience-media-name-${idx}`}>{f.name}</div>
                              <div className="text-xs text-muted-foreground" data-testid={`text-experience-media-meta-${idx}`}>{(f.type || "unknown")} • {Math.round(f.size / 1024)} KB</div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="shrink-0"
                              onClick={() => {
                                const next = [...(field.value ?? [])];
                                next.splice(idx, 1);
                                field.onChange(next);
                              }}
                              data-testid={`button-remove-experience-media-${idx}`}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <FormDescription data-testid="text-experience-media-hint">
                        Attach highlight clips or photos (optional). Files are listed here for review.
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-heading font-black uppercase tracking-widest text-xl py-6 shadow-md transition-transform hover:scale-[1.01]">
                Submit Request
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}


