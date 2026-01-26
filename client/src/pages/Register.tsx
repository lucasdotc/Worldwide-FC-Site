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

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Phone number is too short." }),
  dob: z.string().min(1, { message: "Date of birth is required." }),
  position: z.string().min(1, { message: "Please select a preferred position." }),
  experience: z.string().optional(),
});

export default function Register() {
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
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
