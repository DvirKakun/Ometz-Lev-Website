const HeroBackground: React.FC = () => {
  return (
    <>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        {/* Large gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-400/20 to-transparent rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-accent-400/20 to-transparent rounded-full blur-3xl transform -translate-x-32 translate-y-32"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-primary-300/10 to-accent-300/10 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-8 h-full">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-white/10 h-full"></div>
            ))}
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-primary-300/40 rounded-full animate-pulse"></div>
        <div
          className="absolute top-40 left-32 w-3 h-3 bg-accent-300/40 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 right-40 w-2 h-2 bg-primary-200/40 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-20 w-1 h-1 bg-accent-200/40 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-primary-900/70 to-accent-900/80"></div>
    </>
  );
};

export default HeroBackground;
