import { useEffect, useState } from "react";
import { Trophy, Medal, Award, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchTrending } from "../api/client";
import { normalizeTrending } from "../utils/normalize";

const rankIcon = (rank) => {
  if (rank === 1)
    return <Trophy className="h-5 w-5 text-amber-400" />;
  if (rank === 2)
    return <Medal className="h-5 w-5 text-slate-400" />;
  if (rank === 3)
    return <Award className="h-5 w-5 text-orange-400" />;
  return (
    <span className="h-5 w-5 grid place-items-center text-xs text-slate-500">
      {rank}
    </span>
  );
};

export default function Trending() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const load = () =>
      fetchTrending()
        .then((d) => alive && setItems(normalizeTrending(d)))
        .catch(() => {})
        .finally(() => alive && setLoading(false));
    load();
    const id = setInterval(load, 10000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  return (
    <div className="glass rounded-2xl p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl grid place-items-center bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold">Trending Searches</h3>
            <p className="text-xs text-slate-500">Auto-refreshes every 10s</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-12 rounded-xl bg-slate-200/60 dark:bg-white/5 animate-pulse"
            />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-10 text-slate-500">
          No trending data yet
        </div>
      ) : (
        <ul className="space-y-2">
          <AnimatePresence initial={false}>
            {items.slice(0, 7).map((it) => (
              <motion.li
                layout
                key={it.query + it.rank}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/40 dark:bg-white/5 border border-white/30 dark:border-white/5 hover:scale-[1.01] transition-transform"
              >
                <div className="w-7 grid place-items-center">
                  {rankIcon(it.rank)}
                </div>
                <span className="flex-1 truncate font-medium">{it.query}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 tabular-nums">
                  {it.count}
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
