import { motion } from "framer-motion";
import { Home, Image, Radio, PartyPopper } from "lucide-react";

interface BottomNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "memories", icon: Image, label: "Gallery" },
  { id: "fm", icon: Radio, label: "Radio" },
  { id: "celebration", icon: PartyPopper, label: "Celebration" },
];

const BottomNav = ({ activeSection, onNavigate }: BottomNavProps) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass-strong rounded-full px-2 py-2 flex gap-1"
    >
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-500 ${
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground/70"
            }`}
          >
            <item.icon size={18} strokeWidth={1.5} />
            {isActive && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xs font-body tracking-wider overflow-hidden whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            )}
          </button>
        );
      })}
    </motion.nav>
  );
};

export default BottomNav;
