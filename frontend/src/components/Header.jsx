import { Moon, Sun, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Header({ theme, toggleTheme }) {
  return (
    <header className="w-full max-w-6xl mx-auto px-4 pt-8 pb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 grid place-items-center shadow-lg shadow-indigo-500/30">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <span className="font-semibold tracking-tight">Typeahead</span>
        <span className="hidden sm:inline ml-2 text-xs px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
          v1.0 · Distributed
        </span>
      </div>
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="h-10 w-10 rounded-xl glass grid place-items-center hover:shadow-lg transition-shadow"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-amber-400" />
        ) : (
          <Moon className="h-5 w-5 text-indigo-500" />
        )}
      </motion.button>
    </header>
  );
}
