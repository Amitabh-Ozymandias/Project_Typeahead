import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Loader2, X, History, Clock } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { useDebounce } from "../hooks/useDebounce";
import { fetchSuggestions, recordSearch } from "../api/client";
import { normalizeSuggestions } from "../utils/normalize";

function highlight(text, prefix) {
  if (!prefix) return text;
  const lower = text.toLowerCase();
  const p = prefix.toLowerCase();
  if (!lower.startsWith(p)) return text;
  return (
    <>
      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
        {text.slice(0, prefix.length)}
      </span>
      <span>{text.slice(prefix.length)}</span>
    </>
  );
}

export default function SearchBar({ recents, addRecent, clearRecents }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [showHistory, setShowHistory] = useState(false);

  const debounced = useDebounce(query, 300);
  const wrapRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
        setShowHistory(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    if (!debounced.trim()) {
      setSuggestions([]);
      setLoading(false);
      return;
    }
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    fetchSuggestions(debounced, controller.signal)
      .then((data) => {
        setSuggestions(normalizeSuggestions(data));
        setOpen(true);
        setActiveIdx(-1);
      })
      .catch((err) => {
        if (err.name !== "CanceledError" && err.code !== "ERR_CANCELED") {
          // silent for typing flow but log
          console.warn("suggest error", err.message);
        }
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [debounced]);

  const select = async (value) => {
    setQuery(value);
    setOpen(false);
    setShowHistory(false);
    try {
      await recordSearch(value);
      addRecent(value);
      toast.success("Search recorded successfully");
    } catch (e) {
      toast.error("Failed to record search");
    }
  };

  const onKeyDown = (e) => {
    const list = showHistory ? recents : suggestions;
    if (!list.length) {
      if (e.key === "Enter" && query.trim()) select(query.trim());
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % list.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i <= 0 ? list.length - 1 : i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = activeIdx >= 0 ? list[activeIdx] : query.trim();
      if (pick) select(pick);
    } else if (e.key === "Escape") {
      setOpen(false);
      setShowHistory(false);
    }
  };

  const showDropdown = useMemo(
    () => open && (loading || suggestions.length > 0 || debounced.trim()),
    [open, loading, suggestions.length, debounced]
  );

  return (
    <div ref={wrapRef} className="relative w-full max-w-3xl mx-auto px-4">
      <div className="relative">
        <Search className="absolute left-7 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setShowHistory(false);
          }}
          onFocus={() => {
            if (suggestions.length) setOpen(true);
            if (!query && recents.length) setShowHistory(true);
          }}
          onKeyDown={onKeyDown}
          placeholder="Start typing..."
          className="w-full pl-14 pr-28 py-5 text-base sm:text-lg rounded-2xl glass outline-none focus:ring-2 focus:ring-indigo-500/40 transition placeholder:text-slate-400"
        />
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {loading && (
            <Loader2 className="h-5 w-5 text-indigo-500 animate-spin" />
          )}
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setSuggestions([]);
                setOpen(false);
              }}
              className="p-1 rounded-full hover:bg-slate-200/60 dark:hover:bg-slate-700/60"
              aria-label="Clear"
            >
              <X className="h-4 w-4 text-slate-500" />
            </button>
          )}
          <button
            onClick={() => {
              setShowHistory((s) => !s);
              setOpen(true);
            }}
            className="p-2 rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-700/60"
            aria-label="History"
            title="Recent searches"
          >
            <History className="h-5 w-5 text-slate-500" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {(showDropdown || (showHistory && recents.length > 0)) && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-4 right-4 mt-2 z-30 glass rounded-2xl overflow-hidden"
          >
            {showHistory ? (
              <div>
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/60 dark:border-white/10">
                  <span className="text-xs uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5" /> Recent searches
                  </span>
                  <button
                    onClick={clearRecents}
                    className="text-xs text-rose-500 hover:underline"
                  >
                    Clear history
                  </button>
                </div>
                <ul className="max-h-72 overflow-y-auto">
                  {recents.map((item, i) => (
                    <li
                      key={item + i}
                      onMouseEnter={() => setActiveIdx(i)}
                      onClick={() => select(item)}
                      className={`px-4 py-3 cursor-pointer flex items-center gap-3 transition ${
                        activeIdx === i
                          ? "bg-indigo-500/10"
                          : "hover:bg-slate-100/70 dark:hover:bg-white/5"
                      }`}
                    >
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : loading && suggestions.length === 0 ? (
              <div className="p-4 space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-9 rounded-lg bg-slate-200/60 dark:bg-white/5 animate-pulse"
                  />
                ))}
              </div>
            ) : suggestions.length === 0 ? (
              <div className="px-4 py-6 text-center text-slate-500">
                No suggestions found
              </div>
            ) : (
              <ul className="max-h-80 overflow-y-auto">
                {suggestions.map((s, i) => (
                  <li
                    key={s + i}
                    onMouseEnter={() => setActiveIdx(i)}
                    onClick={() => select(s)}
                    className={`px-4 py-3 cursor-pointer flex items-center gap-3 transition ${
                      activeIdx === i
                        ? "bg-indigo-500/10"
                        : "hover:bg-slate-100/70 dark:hover:bg-white/5"
                    }`}
                  >
                    <Search className="h-4 w-4 text-slate-400" />
                    <span>{highlight(s, debounced)}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
