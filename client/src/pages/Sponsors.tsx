import { motion } from "framer-motion";
import hero3 from "@/assets/hero-3.png";

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  bio: string;
  link: string;
}

const sponsors: Sponsor[] = [
  {
    id: "sponsor-1",
    name: "CMP Auto",
    logo: "cmp_bk.webp",
    bio: "CMP Auto is a trusted automotive dealership committed to providing exceptional service and quality vehicles to our community. With a wide selection of new and pre-owned cars, we strive to make every customer's experience seamless and enjoyable. Our dedicated team is passionate about helping you find the perfect vehicle that fits your needs and budget. At CMP Auto, we believe in building lasting relationships with our customers through honesty, integrity, and a commitment to excellence.",
    link:"https://www.cmpauto.com"
  },
  {
    id: "sponsor-2",
    name: "Carvajal Trims",
    logo: "carvajal.png",
    bio: "Helping achieve the look you want.",
    link:"https://www.instagram.com/c.trims/"
  },
  
];

export default function Sponsors() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

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
            Our <span className="text-accent">Sponsors</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">
            Proud partners supporting Worldwide FC's mission to build champions.
          </p>
        </div>
      </div>

      {/* Sponsors Grid */}
      <div className="container mx-auto px-4 py-24">
        <motion.div
          className="flex flex-wrap justify-center gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sponsors.map((sponsor) => (
            <motion.div
              key={sponsor.id}
              variants={itemVariants}
              className="group relative w-full sm:w-80"
            >
              <div className="bg-muted rounded-lg overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                {/* Logo Container */}
                <div className="w-full h-48 bg-white/5 flex items-center justify-center p-6 border-b border-primary/20">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-heading font-bold text-primary mb-3 uppercase tracking-tight">
                    {sponsor.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                    {sponsor.bio}
                  </p>
                  <div className="mt-4 pt-4 border-t border-primary/20">
                    <a
                      href={sponsor.link}
                      className="text-accent font-semibold text-sm uppercase tracking-widest hover:text-accent/80 transition-colors"
                    >
                      Learn More →
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4 uppercase italic">
            Become a <span className="text-accent">Sponsor</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Interested in partnering with Worldwide FC? We offer various sponsorship packages to support your brand while helping us grow the beautiful game.
          </p>
          <a
            href="/contact"
            className="inline-block bg-accent text-white font-bold py-3 px-8 rounded-sm hover:bg-accent/90 transition-colors uppercase tracking-wider"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
