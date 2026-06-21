import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, AlertCircle, Activity } from "lucide-react";
import { fetchMetrics } from "../api/client";
import { normalizeMetrics } from "../utils/normalize";

function AnimatedNumber({ value }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -12, opacity: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 20 }}
        className="inline-block"
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

function Card({ icon: Icon, label, value, gradient, suffix }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass rounded-2xl p-5 sm:p-6 relative overflow-hidden"
    >
      <div
        className={`absolute -top-10 -right-10 h-32 w-32 rounded-full blur-3xl opacity-40 ${gradient}`}
      />
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {label}
        </span>
        <div
          className={`h-10 w-10 rounded-xl grid place-items-center text-white ${gradient}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-3 text-3xl sm:text-4xl font-bold tabular-nums">
        <AnimatedNumber value={value} />
        {suffix && <span className="text-xl ml-1">{suffix}</span>}
      </div>
    </motion.div>
  );
}

export default function MetricsCards() {
  const [m, setM] = useState({ hits: 0, misses: 0, rate: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetchMetrics()
        .then((d) => alive && (setM(normalizeMetrics(d)), setLoaded(true)))
        .catch(() => {});
    load();
    const id = setInterval(load, 5000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  if (!loaded) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="glass rounded-2xl p-6 h-32 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card
        icon={Zap}
        label="Cache Hits"
        value={m.hits}
        gradient="bg-gradient-to-br from-emerald-500 to-teal-500"
      />
      <Card
        icon={AlertCircle}
        label="Cache Misses"
        value={m.misses}
        gradient="bg-gradient-to-br from-rose-500 to-orange-500"
      />
      <Card
        icon={Activity}
        label="Cache Hit Rate"
        value={m.rate}
        suffix="%"
        gradient="bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500"
      />
    </div>
  );
}
