import { motion } from "framer-motion";
import hero3 from "@/assets/hero-3.png";
import { Trophy, Users, Globe, Target } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative bg-primary py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-primary/90 z-10"></div>
          <img src={hero3} alt="Background" className="w-full h-full object-cover opacity-50" />
        </div>
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 className="text-6xl md:text-8xl font-heading font-black text-white uppercase italic tracking-tighter mb-4">
            About <span className="text-accent">Us</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">
            Building champions on and off the pitch since 2015.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-bold tracking-widest uppercase mb-2 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6 uppercase italic">
              From Local Fields to Global Ambitions
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                Worldwide FC was founded with a simple yet powerful mission: to create a soccer club that transcends borders. What started as a small group of friends playing weekend pickup games has evolved into a premier competitive organization.
              </p>
              <p>
                We believe that football is a universal language. Our club brings together players from diverse backgrounds, cultures, and playing styles to create a unique and dynamic brand of football that is exciting to watch and difficult to play against.
              </p>
              <p>
                Today, we compete in top regional leagues, offering development pathways for players of all ages and skill levels. We are not just a team; we are a family united by our love for the game.
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-muted p-8 text-center rounded-sm hover:shadow-lg transition-shadow">
              <Trophy className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-heading text-4xl font-bold text-primary">15+</h3>
              <p className="text-sm uppercase tracking-wide font-bold text-muted-foreground">Trophies Won</p>
            </div>
            <div className="bg-muted p-8 text-center rounded-sm hover:shadow-lg transition-shadow">
              <Users className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-heading text-4xl font-bold text-primary">200+</h3>
              <p className="text-sm uppercase tracking-wide font-bold text-muted-foreground">Active Players</p>
            </div>
            <div className="bg-muted p-8 text-center rounded-sm hover:shadow-lg transition-shadow">
              <Globe className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-heading text-4xl font-bold text-primary">20+</h3>
              <p className="text-sm uppercase tracking-wide font-bold text-muted-foreground">Nationalities</p>
            </div>
            <div className="bg-muted p-8 text-center rounded-sm hover:shadow-lg transition-shadow">
              <Target className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-heading text-4xl font-bold text-primary">100%</h3>
              <p className="text-sm uppercase tracking-wide font-bold text-muted-foreground">Commitment</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
