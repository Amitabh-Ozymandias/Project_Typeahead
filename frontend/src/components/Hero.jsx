import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="text-center max-w-3xl mx-auto px-4 mt-6 mb-8">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
      >
        <span className="gradient-text">Distributed Typeahead</span>
        <br />
        <span className="text-slate-900 dark:text-white">Search Engine</span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400"
      >
        Trie + Redis Cache + Consistent Hashing + Analytics
      </motion.p>
    </section>
  );
}
