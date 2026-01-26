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
          FAQ
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
              How many teams do you guys have?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-lg">
              We currently have men's teams in Division 4 and Division 5, playing in CUSA. We are looking to expand to more divisions in the future.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border px-4 bg-white shadow-sm">
            <AccordionTrigger className="font-heading text-xl font-bold text-primary hover:text-accent uppercase">
              When and where are trainings?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-lg">
              Training sessions are largely dependent on the season and venue availability. We typically train at least once per week, along with friendly matches and individual sessions throughout the season. Coaches provide specific details to players a week or more in advance.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border px-4 bg-white shadow-sm">
            <AccordionTrigger className="font-heading text-xl font-bold text-primary hover:text-accent uppercase">
              Is there a membership fee?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-lg">
              Yes, there is a seasonal membership fee of $300 CAD that covers kit, field rental, gear, and league registration fees. 
            </AccordionContent>
          </AccordionItem>
          
           <AccordionItem value="item-5" className="border px-4 bg-white shadow-sm">
            <AccordionTrigger className="font-heading text-xl font-bold text-primary hover:text-accent uppercase">
              What programs do you play?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-lg">
              In the outdoor season, we play men's open 11v11. In the indoor season, we play men's open 6v6 boardless.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6" className="border px-4 bg-white shadow-sm">
            <AccordionTrigger className="font-heading text-xl font-bold text-primary hover:text-accent uppercase">
              Is there a registration deadline?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-lg">
              No! Players are welcome to submit a registration request at any time during the season. However, due to capacity limits, we urge players to register in advance to secure their spot.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7" className="border px-4 bg-white shadow-sm">
            <AccordionTrigger className="font-heading text-xl font-bold text-primary hover:text-accent uppercase">
              Where can I find the game schedules?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-lg">
              Schedules are available on the {" "}
              <a
                href="https://www.cusa.ab.ca/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-accent"
              >
                CUSA website
              </a>. Registered players will also receive access to the RAMP app, which provides detailed match information and updates.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
