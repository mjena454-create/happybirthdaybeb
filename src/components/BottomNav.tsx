import { motion, AnimatePresence } from "framer-motion";
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
    <motion.nav
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-5 left-1/2 z-50 flex items-center"
      style={{ transform: "translateX(-50%)" }}
    >
      <div className="glass-nav rounded-2xl px-2 py-2 flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="relative flex items-center justify-center gap-2 rounded-xl transition-all duration-500 outline-none"
              style={{
                padding: isActive ? "10px 20px" : "10px 14px",
              }}
            >
              {/* Active background glow */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: "hsla(220, 60%, 55%, 0.12)",
                      border: "1px solid hsla(210, 20%, 72%, 0.15)",
                      boxShadow: "0 0 20px hsla(220, 60%, 55%, 0.1), inset 0 1px 0 hsla(210, 30%, 85%, 0.08)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </AnimatePresence>

              <item.icon
                size={16}
                strokeWidth={1.5}
                className={`relative z-10 transition-colors duration-500 ${
                  isActive ? "text-silver-light" : "text-muted-foreground"
                }`}
                style={{
                  color: isActive ? "hsl(210, 30%, 85%)" : undefined,
                  filter: isActive ? "drop-shadow(0 0 4px hsla(210, 20%, 72%, 0.4))" : "none",
                }}
              />

              <AnimatePresence>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 text-[11px] font-body tracking-[0.15em] uppercase overflow-hidden whitespace-nowrap"
                    style={{ color: "hsl(210, 30%, 85%)" }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNav;
