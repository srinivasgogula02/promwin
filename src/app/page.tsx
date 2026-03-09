export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6 selection:bg-yellow-200">
      <div className="max-w-2xl w-full text-center">
        <span className="inline-block px-4 py-1.5 mb-8 text-xs font-bold tracking-widest uppercase bg-yellow-400 text-black rounded-full">
          JOIN WAITLIST
        </span>

        <h1 className="text-7xl md:text-8xl font-bold tracking-tight text-slate-950 mb-6">
          prom<span className="text-yellow-400">win</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-500 mb-12 font-medium max-w-lg mx-auto leading-tight">
          The premium marketplace for creators to monetize AI prompts.
        </p>

        <form className="relative max-w-md mx-auto group">
          <div className="flex flex-col sm:flex-row gap-2 p-2 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md shadow-sm group-focus-within:border-yellow-400 transition-all">
            <input
              type="email"
              placeholder="name@email.com"
              className="w-full px-4 py-3 rounded-xl bg-transparent text-slate-900 focus:outline-none placeholder-slate-400"
              required
            />
            <button
              type="submit"
              className="yellow-glow whitespace-nowrap px-8 py-3 bg-yellow-400 hover:bg-black hover:text-white text-black font-bold rounded-xl transition-all duration-300 cursor-pointer"
            >
              Get Early Access
            </button>
          </div>

          <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-full h-full bg-yellow-100 blur-2xl opacity-30 rounded-full"></div>
        </form>

        <div className="mt-12 flex items-center justify-center gap-8 text-slate-400 font-medium text-sm">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span> 0% Listing Fees
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span> Verified Prompts
          </span>
        </div>
      </div>
    </div>
  );
}
