import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import indoor from "@/assets/indoor.jpeg"
import outdoor from "@/assets/outdoor.jpeg"
import vini from "@/assets/vini.jpeg"

export default function Home() {

  const slides = [
    {
      image: indoor,
      title: "WE ARE WORLDWIDE FC",
      subtitle: "A team where no player is bigger than the club.",
      cta: "Join the Squad",
      link: "/register"
    },
    {
      image: outdoor,
      title: "PLAY WITH PASSION",
      subtitle: "Compete at various levels in our regional leagues.",
      cta: "See Schedule",
      link: "https://www.cusa.ab.ca/team/12964/1049/11493/343291"
    },
    {
      image: vini,
      title: "REACH YOUR FULL POTENTIAL",
      subtitle: "Capable coaching staff dedicated to your development.",
      cta: "About Us",
      link: "/about"
    }
  ];

  return (

    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Carousel */}
      <section className="relative w-full h-[80vh] bg-black">
        <Carousel
          className="w-full h-full"
          plugins={[Autoplay({ delay: 8000, stopOnInteraction: true })]}
          opts={{ loop: true }}
        >
          <CarouselContent className="h-full">
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="relative w-full h-[80vh]">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div
                  className="absolute inset-0 bg-cover"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    backgroundPosition: index === 1 ? "center 55%" : index === 2 ? "center 15%" : "center 70%",
                  }}
                />
                
                <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 1.0 }}
                    className="text-6xl md:text-8xl lg:text-9xl font-heading font-black text-white italic tracking-tighter uppercase drop-shadow-xl"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 1.0 }}
                    className="text-xl md:text-2xl text-white/90 max-w-2xl mt-4 mb-8 font-medium drop-shadow-md"
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1.0 }}
                  >
                    {slide.link.startsWith("http") ? (
                      <a
                        href={slide.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="lg"
                          className="bg-accent/80 text-accent-foreground hover:bg-white hover:text-primary text-lg px-8 py-6 font-heading font-bold uppercase tracking-wider transition-all transform hover:scale-105 shadow-xl border-2 border-transparent hover:border-white rounded-xl"
                        >
                          {slide.cta}
                        </Button>
                      </a>
                    ) : (
                      <a href={slide.link}>
                        <Button
                          size="lg"
                          className="bg-accent/80 text-accent-foreground hover:bg-white hover:text-primary text-lg px-8 py-6 font-heading font-bold uppercase tracking-wider transition-all transform hover:scale-105 shadow-xl border-2 border-transparent hover:border-white rounded-xl"
                        >
                          {slide.cta}
                        </Button>
                      </a>
                    )}
                  </motion.div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-4 bg-white/10 hover:bg-white/20 border-none text-white" />
            <CarouselNext className="right-4 bg-white/10 hover:bg-white/20 border-none text-white" />
          </div>
        </Carousel>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <span className="text-accent font-bold tracking-widest uppercase mb-4 block">Welcome to Worldwide</span>
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-primary mb-8 uppercase italic">
            The World's Game, <br />Played Locally
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
            Worldwide FC is dedicated to bringing together players from all backgrounds to compete, grow, and celebrate the beautiful game.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-muted hover:bg-primary hover:text-white transition-colors group">
              <h3 className="text-3xl font-heading font-bold mb-4 uppercase italic">Elite Training</h3>
              <p className="group-hover:text-white/80">Access to coaching, frequent training, and personal development programs.</p>
            </div>
            <div className="p-8 bg-muted hover:bg-primary hover:text-white transition-colors group">
              <h3 className="text-3xl font-heading font-bold mb-4 uppercase italic">Global Community</h3>
              <p className="group-hover:text-white/80">Join a diverse squad of players from around the globe united by football.</p>
            </div>
            <div className="p-8 bg-muted hover:bg-primary hover:text-white transition-colors group">
              <h3 className="text-3xl font-heading font-bold mb-4 uppercase italic">Competitive Play</h3>
              <p className="group-hover:text-white/80">Weekly matches, league play, and tournaments to test your skills against the best.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Fix: removed 'fixed' class which caused overlay issues across the page */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-6xl md:text-8xl font-heading font-black uppercase italic mb-8 text-white">
            Ready to <span className="text-accent">Play?</span>
          </h2>
          <p className="text-2xl text-white/80 mb-10 max-w-2xl mx-auto">
            Registration for the 2026 outdoor season is now open.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-white hover:text-primary text-xl px-12 py-8 font-heading font-bold uppercase tracking-widest shadow-2xl transition-transform hover:scale-105">
              Enter Registration Request
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
