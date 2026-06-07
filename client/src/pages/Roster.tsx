import { motion } from "framer-motion";

type Player = {
  number: number;
  name: string;
};

const rosters: { team: string; players: Player[] }[] = [
  {
    team: "Worldwide FC",
    players: [
      { number: 63, name: "Phillip Hanoski" },
      { number: 24, name: "Tomás Monroy" },
      { number: 3, name: "Mateo Bustamante" },
      { number: 4, name: "Devon Gallo" },
      { number: 56, name: "Mathew Castillo" },
      { number: 5, name: "Vinicius Tedesco" },
      { number: 1, name: "Benjamin Villalobos" },
      { number: 8, name: "Braulio Nieto" },
      { number: 4, name: "Daniel Villamizar" },
      { number: 11, name: "Luigi Teles" },
      { number: 7, name: "Vitor Furquim" },
      { number: 6, name: "Mustafa Asif" },
      { number: 43, name: "Mateo Rojas" },
      { number: 47, name: "Diego Aguilar" },
      { number: 18, name: "Milan Aguilar" },
      { number: 26, name: "Mateo Bernal" },
      { number: 10, name: "Dominik Brogowski" },
      { number: 66, name: "Andre Balan" },
      { number: 14, name: "Jhon Canizares" },
      { number: 3, name: "Ty Kelly" },
      { number: 62, name: "Sebastian Ferrer" },
      { number: 9, name: "Justin Tomani" },
    ],
  },
  {
    team: "Chargers",
    players: [
      { number: 72, name: "Hector Demarco" },
      { number: 23, name: "Didier Gutierrez" },
      { number: 0, name: "Jose Funes" },
      { number: 0, name: "Nicolás Bustos Quisberth" },
      { number: 0, name: "Gerson Balaguera" },
      { number: 10, name: "James Morrissey" },
      { number: 1, name: "Thomas Yates" },
      { number: 12, name: "Teague Gindl" },
      { number: 15, name: "Kaden Marcelo" },
      { number: 11, name: "Deybith Alejo Canon" },
      { number: 32, name: "Klarenz Dsouza" },
      { number: 21, name: "Umair Mohamedali" },
      { number: 63, name: "Kevin Martinez" },
      { number: 0, name: "Nelson Balaguera" },
      { number: 42, name: "Matei Djukic" },
      { number: 17, name: "Krishna Odedra" },
      { number: 34, name: "Lucas Carvalho" },
      { number: 0, name: "Jack Telmer" },
      { number: 0, name: "Theo Altabbaa" },
      { number: 0, name: "Kuljot Jaswal" },
      { number: 0, name: "Juan Tambo" },
      { number: 0, name: "Luis Barros" },
      { number: 0, name: "Sebastian Villarroel Sevilla" },
    ],
  },
  {
    team: "Inferno",
    players: [
      { number: 18, name: "Antony Johnson Chittilapilly" },
      { number: 35, name: "German Gomez Urbina" },
      { number: 44, name: "Mohsen Rahimi" },
      { number: 25, name: "Mathias Gomes Namesny" },
      { number: 27, name: "Aaryan Sachar" },
      { number: 29, name: "Danilo Pimentel Coelho" },
      { number: 51, name: "Max Fiorito" },
      { number: 0, name: "Nagulan Senthilkumar" },
      { number: 0, name: "Omar Huq" },
      { number: 33, name: "Parmvir Athwal" },
      { number: 31, name: "Daw Day" },
      { number: 28, name: "Amman Letta" },
      { number: 73, name: "Christian Bell" },
      { number: 0, name: "Goodness Ehioghae" },
      { number: 0, name: "Poe LeBlanc" },
      { number: 40, name: "Ayo Ige" },
      { number: 19, name: "Cristiano Nicoletti" },
      { number: 47, name: "Bennett Husted" },
      { number: 11, name: "Godwin Frimpong" },
      { number: 0, name: "Lucas Haack" },
      { number: 13, name: "David Lisok" },
      { number: 0, name: "Adam Aden" },
      { number: 0, name: "Neil Mattar" },
      { number: 0, name: "Muhammad Shabbir" },
    ],
  },
];

export default function Roster() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative bg-primary py-24">
        <div className="absolute inset-0 bg-primary/90 z-10" />
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 className="text-6xl md:text-8xl font-heading font-black text-white uppercase italic tracking-tighter mb-4">
            Our <span className="text-accent">Rosters</span>
          </h1>
          
        </div>
      </div>

      {/* Roster Cards */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {rosters.map((roster, i) => (
            <motion.div
              key={roster.team}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-muted rounded-sm overflow-hidden shadow-md"
            >
              {/* Team header */}
              <div className="bg-primary px-6 py-4">
                <h2 className="text-2xl font-heading font-bold text-white uppercase italic tracking-wide">
                  {roster.team}
                </h2>
              </div>

              {/* Player list */}
              <ul className="divide-y divide-border">
                {roster.players.map((player) => (
                  <li
                    key={`${player.number}-${player.name}`}
                    className="flex items-center gap-4 px-6 py-3 hover:bg-background/60 transition-colors"
                  >
                    <span className="w-8 text-center font-heading font-bold text-accent text-lg">
                      {player.number}
                    </span>
                    <span className="font-medium text-foreground">{player.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
