import { motion } from "framer-motion";
import { Home, Image, Radio, Sparkles } from "lucide-react";

interface BottomNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "memories", icon: Image, label: "Gallery" },
  { id: "fm", icon: Radio, label: "Radio" },
  { id: "celebration", icon: Sparkles, label: "Celebrate" },
];

const BottomNav = ({ activeSection, onNavigate }: BottomNavProps) => {
  return (
    <div className="fixed inset-x-0 bottom-3 z-50 flex justify-center px-3 md:bottom-5 md:px-4">
      <motion.nav
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="glass-nav pointer-events-auto flex w-max max-w-[96vw] items-center gap-0.5 rounded-full px-1.5 py-1.5 md:gap-1 md:px-2 md:py-2"
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="relative flex min-w-[60px] flex-col items-center justify-center gap-1 rounded-full px-3 py-2.5 transition-all duration-500 md:min-w-[74px] md:px-4 md:py-3"
              style={{
                background: isActive ? "hsla(210, 24%, 93%, 0.08)" : "transparent",
                border: isActive ? "1px solid hsla(210, 18%, 82%, 0.16)" : "1px solid transparent",
                boxShadow: isActive ? "0 10px 28px hsla(222, 40%, 4%, 0.22), inset 0 1px 0 hsla(210, 24%, 93%, 0.08)" : "none",
              }}
            >
              <item.icon
                size={16}
                strokeWidth={1.7}
                style={{
                  color: isActive ? "hsl(var(--silver-light))" : "hsl(var(--silver-dark))",
                  filter: isActive ? "drop-shadow(0 0 8px hsla(210, 24%, 93%, 0.2))" : "none",
                }}
              />
              <span
                className="text-[8px] uppercase tracking-[0.18em] md:text-[9px] md:tracking-[0.24em]"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: isActive ? "hsl(var(--silver-light))" : "hsl(var(--silver-dark))",
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </motion.nav>
    </div>
  );
};

export default BottomNav;
