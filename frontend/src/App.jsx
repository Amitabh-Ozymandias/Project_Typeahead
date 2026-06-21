import { Toaster } from "react-hot-toast";
import { useTheme } from "./hooks/useTheme";
import { useRecentSearches } from "./hooks/useRecentSearches";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import MetricsCards from "./components/MetricsCards";
import Trending from "./components/Trending";
import HashVisualizer from "./components/HashVisualizer";

export default function App() {
  const { theme, toggle } = useTheme();
  const { items, add, clear } = useRecentSearches();

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-grid" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/60 via-indigo-50/40 to-purple-50/40 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-96 w-[80%] max-w-4xl rounded-full bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 blur-3xl" />

      <Toaster
        position="top-right"
        toastOptions={{
          className:
            "!bg-white/90 dark:!bg-slate-800/90 !backdrop-blur !text-slate-900 dark:!text-slate-100 !border !border-white/40 dark:!border-white/10",
        }}
      />

      <Header theme={theme} toggleTheme={toggle} />
      <Hero />

      <main className="max-w-6xl mx-auto pb-16">
        <SearchBar recents={items} addRecent={add} clearRecents={clear} />

        <section className="px-4 mt-10">
          <div className="flex items-end justify-between mb-3">
            <h2 className="text-lg font-semibold">Cache Analytics</h2>
            <span className="text-xs text-slate-500">Live · refreshes every 5s</span>
          </div>
          <MetricsCards />
        </section>

        <section className="px-4 mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Trending />
          <HashVisualizer />
        </section>

        <footer className="mt-12 text-center text-xs text-slate-500 px-4">
          Built with React · Tailwind · Framer Motion · Axios
        </footer>
      </main>
    </div>
  );
}
