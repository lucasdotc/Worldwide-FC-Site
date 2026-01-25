import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-16 text-center">
        <h1 className="text-5xl md:text-7xl font-heading font-black text-white uppercase italic tracking-tighter">
          F.A.Q.
        </h1>
        <p className="text-white/70 mt-4 text-lg">Frequently Asked Questions</p>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="border px-4 bg-white shadow-sm">
            <AccordionTrigger className="font-heading text-xl font-bold text-primary hover:text-accent uppercase">
              How do I join the team?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-lg">
              To join Worldwide FC, you need to submit a registration request through our website. Once received, our coaching staff will review your application and invite you for a trial session if spots are available.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border px-4 bg-white shadow-sm">
            <AccordionTrigger className="font-heading text-xl font-bold text-primary hover:text-accent uppercase">
              What age groups do you have?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-lg">
              We currently have teams for U12, U14, U16, U18, and our Senior Mens First Team. We are looking to expand into women's football in the coming season.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border px-4 bg-white shadow-sm">
            <AccordionTrigger className="font-heading text-xl font-bold text-primary hover:text-accent uppercase">
              When and where are trainings?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-lg">
              Training sessions are held at our home ground on Tuesday and Thursday evenings from 6:30 PM to 8:30 PM. Specific times may vary by age group.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border px-4 bg-white shadow-sm">
            <AccordionTrigger className="font-heading text-xl font-bold text-primary hover:text-accent uppercase">
              Is there a membership fee?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-lg">
              Yes, there is an annual membership fee that covers kit, field rental, insurance, and league registration fees. Financial aid is available for eligible players.
            </AccordionContent>
          </AccordionItem>
          
           <AccordionItem value="item-5" className="border px-4 bg-white shadow-sm">
            <AccordionTrigger className="font-heading text-xl font-bold text-primary hover:text-accent uppercase">
              Do you play international matches?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-lg">
              Yes! As "Worldwide FC", we organize one international tour per season for our senior squad to play against teams from different countries.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
