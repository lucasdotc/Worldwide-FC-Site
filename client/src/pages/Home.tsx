import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Shield, Globe, Trophy, ChevronDown } from "lucide-react";
import indoor from "@/assets/indoor.jpeg";
import outdoor from "@/assets/outdoor.jpeg";
import vini from "@/assets/vini.jpeg";

const VALUE_CARDS = [
  {
    icon: Shield,
    title: "Elite Training",
    body: "Access to coaching, frequent training, and personal development programs.",
  },
  {
    icon: Globe,
    title: "Global Community",
    body: "Join a diverse squad of players from around the globe united by football.",
  },
  {
    icon: Trophy,
    title: "Competitive Play",
    body: "Weekly matches, league play, and tournaments to test your skills against the best.",
  },
];

export default function Home() {
  const slides = [
    {
      image: indoor,
      title: "WE ARE WORLDWIDE FC",
      subtitle: "A team where no player is bigger than the club.",
      cta: "Join the Squad",
      link: "/register",
      external: false,
    },
    {
      image: outdoor,
      title: "PLAY WITH PASSION",
      subtitle: "Compete at various levels in our regional leagues.",
      cta: "See Schedule",
      link: "https://www.cusa.ab.ca/team/12964/1049/11493/343291",
      external: true,
    },
    {
      image: vini,
      title: "REACH YOUR FULL POTENTIAL",
      subtitle: "Capable coaching staff dedicated to your development.",
      cta: "About Us",
      link: "/about",
      external: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Carousel */}
      <section className="relative w-full h-[85vh] bg-black">
        <Carousel
          className="w-full h-full"
          plugins={[Autoplay({ delay: 8000, stopOnInteraction: true })]}
          opts={{ loop: true }}
        >
          <CarouselContent className="h-full">
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="relative w-full h-[85vh]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20 z-10" />
                <div
                  className="absolute inset-0 bg-cover"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    backgroundPosition:
                      index === 1 ? "center 55%" : index === 2 ? "center 15%" : "center 70%",
                  }}
                />

                <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
                  <motion.h1
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white tracking-tight uppercase drop-shadow-xl mb-4"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-lg md:text-xl text-white/85 max-w-xl mb-8 font-medium drop-shadow"
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.45, duration: 0.8 }}
                  >
                    {slide.external ? (
                      <a href={slide.link} target="_blank" rel="noopener noreferrer">
                        <Button
                          size="lg"
                          className="bg-accent text-accent-foreground hover:bg-white hover:text-primary text-base px-8 py-5 font-heading font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105 shadow-2xl cursor-pointer"
                        >
                          {slide.cta}
                        </Button>
                      </a>
                    ) : (
                      <Link href={slide.link}>
                        <Button
                          size="lg"
                          className="bg-accent text-accent-foreground hover:bg-white hover:text-primary text-base px-8 py-5 font-heading font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105 shadow-2xl cursor-pointer"
                        >
                          {slide.cta}
                        </Button>
                      </Link>
                    )}
                  </motion.div>
                </div>

              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-6 bg-white/10 hover:bg-white/25 border-white/20 text-white backdrop-blur-sm cursor-pointer" />
            <CarouselNext className="right-6 bg-white/10 hover:bg-white/25 border-white/20 text-white backdrop-blur-sm cursor-pointer" />
          </div>
        </Carousel>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 text-white/50 animate-bounce pointer-events-none">
          <ChevronDown size={20} />
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 bg-accent" />
            <span className="text-accent text-xs font-bold tracking-[0.25em] uppercase">Welcome to Worldwide FC</span>
            <span className="h-px w-12 bg-accent" />
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-primary mb-6 uppercase">
            The World's Game,<br />Played Locally
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-14">
            Worldwide FC brings together players from all backgrounds to compete, grow, and celebrate the beautiful game right here in Calgary.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {VALUE_CARDS.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="p-8 bg-muted hover:bg-primary hover:text-white transition-colors duration-300 group cursor-default"
              >
                <Icon className="w-10 h-10 text-accent group-hover:text-accent mb-5 mx-auto transition-colors" />
                <h3 className="text-2xl font-heading font-bold mb-3 uppercase">{title}</h3>
                <p className="text-muted-foreground group-hover:text-white/80 text-sm leading-relaxed transition-colors">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: "3", label: "Teams" },
              { value: "70+", label: "Active Players" },
              { value: "20+", label: "Nationalities" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-4xl md:text-5xl font-heading font-black text-accent">{value}</p>
                <p className="text-primary-foreground/70 text-xs uppercase tracking-widest font-bold mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 bg-accent" />
            <span className="text-accent text-xs font-bold tracking-[0.25em] uppercase">2026 Season</span>
            <span className="h-px w-12 bg-accent" />
          </div>
          <h2 className="text-5xl md:text-7xl font-heading font-black uppercase mb-6 text-primary">
            Ready to <span className="text-accent">Play?</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Registration for the 2026 outdoor season is closed. Click the button below to join the waitlist.
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground text-base px-10 py-6 font-heading font-bold uppercase tracking-widest shadow-xl transition-all duration-200 hover:scale-105 cursor-pointer"
            >
              Enter Registration Request
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
