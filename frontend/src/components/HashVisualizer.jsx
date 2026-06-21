import { useState } from "react";
import { Network, Server, Search } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { debugCache } from "../api/client";
import { normalizeDebug } from "../utils/normalize";

export default function HashVisualizer() {
  const [prefix, setPrefix] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    if (!prefix.trim()) return;
    setLoading(true);
    try {
      const data = await debugCache(prefix.trim());
      setResult(normalizeDebug(data));
    } catch (e) {
      toast.error("Failed to fetch routing info");
    } finally {
      setLoading(false);
    }
  };

  const nodes = result?.nodes || ["Cache-1", "Cache-2", "Cache-3", "Cache-4"];
  const selected = result?.node;

  return (
    <div className="glass rounded-2xl p-6 h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-9 w-9 rounded-xl grid place-items-center bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
          <Network className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold">Consistent Hashing</h3>
          <p className="text-xs text-slate-500">Check Prefix Routing</p>
        </div>
      </div>

      <div className="flex gap-2 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && check()}
            placeholder="e.g. iphone"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/60 dark:bg-white/5 border border-white/40 dark:border-white/10 outline-none focus:ring-2 focus:ring-indigo-500/40"
          />
        </div>
        <button
          onClick={check}
          disabled={loading}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white font-medium shadow-lg shadow-indigo-500/30 hover:opacity-90 disabled:opacity-50 transition"
        >
          {loading ? "..." : "Check"}
        </button>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 text-sm rounded-xl p-3 bg-indigo-500/5 border border-indigo-500/20"
        >
          <div>
            <span className="text-slate-500">Prefix:</span>{" "}
            <span className="font-mono font-semibold">{result.prefix}</span>
          </div>
          <div>
            <span className="text-slate-500">Assigned Cache Node:</span>{" "}
            <span className="font-mono font-semibold text-indigo-500">
              {result.node || "—"}
            </span>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {nodes.map((n) => {
          const active = n === selected;
          return (
            <motion.div
              key={n}
              animate={
                active
                  ? {
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        "0 0 0 0 rgba(99,102,241,0.4)",
                        "0 0 0 12px rgba(99,102,241,0)",
                        "0 0 0 0 rgba(99,102,241,0)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 1.4, repeat: active ? Infinity : 0 }}
              className={`relative rounded-xl p-4 text-center border transition ${
                active
                  ? "bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white border-transparent shadow-lg shadow-indigo-500/30"
                  : "bg-white/40 dark:bg-white/5 border-white/40 dark:border-white/10"
              }`}
            >
              <Server
                className={`h-5 w-5 mx-auto mb-1 ${
                  active ? "text-white" : "text-slate-400"
                }`}
              />
              <div className="text-sm font-mono font-semibold">{n}</div>
              {active && (
                <div className="text-[10px] uppercase tracking-wider mt-1 opacity-90">
                  Routed
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
