import { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, ArrowRight, SlidersHorizontal, ChevronDown, Moon, Sun } from "lucide-react";
import sapateroHammers from "@/imports/image-1.png";

// ── DATA ─────────────────────────────────────────────────────────────────────

const SHOES = [
  {
    id: 1,
    name: "Il Cavaliere",
    style: "Derby Oxford",
    category: "Oxford",
    leather: "Box Calf",
    origin: "Firenze",
    construction: "Goodyear Welt",
    lining: "Vitello Pieno",
    sole: "Cuoio Doppio",
    description: "A hand-stitched brogue derby of exceptional refinement. The close-cut edge and hand-burnished cap define a silhouette built for the ages.",
    colors: [
      { name: "Nero", hex: "#1a1410" },
      { name: "Mogano", hex: "#6b2d1a" },
      { name: "Cioccolato", hex: "#3d200e" },
    ],
    price: "₱ 72,500",
    image: "https://images.unsplash.com/photo-1777987601426-c05a82045862?w=600&h=720&fit=crop&auto=format",
  },
  {
    id: 2,
    name: "La Primavera",
    style: "Penny Loafer",
    category: "Loafer",
    leather: "Suede Camoscio",
    origin: "Napoli",
    construction: "Blake Stitch",
    lining: "Capretto",
    sole: "Cuoio Sottile",
    description: "Sun-dried in Neapolitan tradition. A graceful penny loafer in buttery suede, cut low for an effortlessly cultivated spring silhouette.",
    colors: [
      { name: "Cognac", hex: "#b5651d" },
      { name: "Tabacco", hex: "#7a4b2a" },
      { name: "Blu Notte", hex: "#1a2340" },
      { name: "Sabbia", hex: "#c9a87c" },
    ],
    price: "₱ 57,200",
    image: "https://images.unsplash.com/photo-1676121270762-47c8d3a7b9d5?w=600&h=720&fit=crop&auto=format",
  },
  {
    id: 3,
    name: "Il Doge",
    style: "Full Brogue Oxford",
    category: "Oxford",
    leather: "Grain Calf",
    origin: "Venezia",
    construction: "Goodyear Welt",
    lining: "Vitello Pieno",
    sole: "Cuoio con Mezza Gomma",
    description: "Named for the lords of Venice. Full broguing on a wide last lends authority without sacrificing the elegance of the old republic.",
    colors: [
      { name: "Mogano", hex: "#6b2d1a" },
      { name: "Brandy", hex: "#a0522d" },
      { name: "Verde Scuro", hex: "#1f3d2a" },
    ],
    price: "₱ 63,600",
    image: "https://images.unsplash.com/photo-1563434194539-fcc823f9bf92?w=600&h=720&fit=crop&auto=format",
  },
  {
    id: 4,
    name: "La Veneziana",
    style: "Wholecut Oxford",
    category: "Oxford",
    leather: "Box Calf Naturale",
    origin: "Firenze",
    construction: "Goodyear Welt",
    lining: "Capretto",
    sole: "Cuoio Naturale",
    description: "Cut from a single piece of pale Florentine calf. No seams interrupt the unbroken curve of the vamp — only the maker's mark on the insole.",
    colors: [
      { name: "Naturale", hex: "#c9956a" },
      { name: "Sabbia", hex: "#d4aa7d" },
      { name: "Avorio", hex: "#e8d5b5" },
    ],
    price: "₱ 86,400",
    image: "https://images.unsplash.com/photo-1614253429340-98120bd6d753?w=600&h=720&fit=crop&auto=format",
  },
  {
    id: 5,
    name: "Il Maestro",
    style: "Double Monk Strap",
    category: "Monk Strap",
    leather: "Cordovan",
    origin: "Milano",
    construction: "Goodyear Welt",
    lining: "Vitello Pieno",
    sole: "Cuoio con Tacco in Gomma",
    description: "Shell cordovan sourced from a single Milanese tannery. Two hand-burnished straps in brushed gold hardware complete the master's signature.",
    colors: [
      { name: "Nero", hex: "#1a1410" },
      { name: "Bordeaux", hex: "#5d1a2a" },
      { name: "Castagna", hex: "#7a3520" },
    ],
    price: "₱ 96,300",
    image: "https://images.unsplash.com/photo-1758542988948-b95a6c4aa68b?w=600&h=720&fit=crop&auto=format",
  },
  {
    id: 6,
    name: "La Dolce Vita",
    style: "Chelsea Boot",
    category: "Chelsea Boot",
    leather: "Suede Vellutato",
    origin: "Roma",
    construction: "Blake Stitch",
    lining: "Capretto",
    sole: "Gomma Carrarmato",
    description: "Roman nights, Venetian mornings. Velvet suede in rich bordeaux, elastic gussets hidden inside a clean silhouette that moves with you.",
    colors: [
      { name: "Bordeaux", hex: "#5d1a2a" },
      { name: "Antracite", hex: "#2d2d30" },
      { name: "Caramello", hex: "#c47a3a" },
    ],
    price: "₱ 65,400",
    image: "https://images.unsplash.com/photo-1648343615199-03567050abbb?w=600&h=720&fit=crop&auto=format",
  },
];

const TRANSITION_SLIDES = [
  { type: "brand" as const },
  { type: "shoe" as const, shoeIndex: 0 },
  { type: "shoe" as const, shoeIndex: 1 },
  { type: "shoe" as const, shoeIndex: 3 },
  { type: "shoe" as const, shoeIndex: 4 },
];

const FILTERS = ["All", "Oxford", "Loafer", "Monk Strap", "Chelsea Boot"];

// ── TRANSITION SCREEN ────────────────────────────────────────────────────────

function TransitionScreen({ slideIndex, visible }: { slideIndex: number; visible: boolean }) {
  const slide = TRANSITION_SLIDES[slideIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: "#0e0c0a" }}
    >
      <style>{`
        @keyframes lineGrow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes letterSpacingIn {
          from { letter-spacing: 0.5em; opacity: 0; }
          to   { letter-spacing: 0.25em; opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(24px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        @keyframes imgReveal {
          from { clip-path: inset(0 100% 0 0); }
          to   { clip-path: inset(0 0% 0 0); }
        }
        .line-grow   { animation: lineGrow 1s cubic-bezier(0.16,1,0.3,1) forwards; transform-origin: left; }
        .letter-in   { animation: letterSpacingIn 1s ease forwards; }
        .slide-up    { animation: slideUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }
        .img-reveal  { animation: imgReveal 1.1s cubic-bezier(0.16,1,0.3,1) forwards; }
      `}</style>

      {/* Slide fade wrapper */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.45s ease" }}
      >
        {slide.type === "brand" ? (
          /* ── Brand slide ── */
          <div className="flex flex-col items-center gap-6 text-center px-8">
            {/* Gold ornament */}
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-16 line-grow" style={{ background: "#b8924a" }} />
              <svg width="10" height="10" viewBox="0 0 10 10">
                <path d="M5 0 L6.2 3.8 L10 5 L6.2 6.2 L5 10 L3.8 6.2 L0 5 L3.8 3.8 Z" fill="#b8924a" />
              </svg>
              <div className="h-px w-16 line-grow" style={{ background: "#b8924a", animationDelay: "0.1s" }} />
            </div>
            <p
              className="letter-in"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", color: "#b8924a", textTransform: "uppercase" }}
            >
              Sapatero Manila — Est. 1952
            </p>
            <h1
              className="slide-up"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(3rem, 8vw, 6rem)",
                color: "#f2ede6",
                fontStyle: "italic",
                lineHeight: 1.05,
                animationDelay: "0.2s",
                opacity: 0,
              }}
            >
              Benvenuti
            </h1>
            <p
              className="slide-up"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(1rem, 2vw, 1.4rem)",
                color: "#7a6f61",
                fontStyle: "italic",
                animationDelay: "0.45s",
                opacity: 0,
              }}
            >
              nella nostra collezione
            </p>
          </div>
        ) : (
          /* ── Shoe slide ── */
          <div className="w-full h-full flex">
            {/* Image — right 55% */}
            <div className="hidden md:block absolute right-0 top-0 w-[55%] h-full overflow-hidden">
              <img
                src={SHOES[slide.shoeIndex].image}
                alt={SHOES[slide.shoeIndex].name}
                className="img-reveal w-full h-full object-cover"
                style={{ filter: "brightness(0.75) contrast(1.1)" }}
              />
              {/* Gradient mask into left panel */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to right, #0e0c0a 0%, transparent 35%)" }}
              />
            </div>

            {/* Mobile full-bleed image */}
            <div className="md:hidden absolute inset-0">
              <img
                src={SHOES[slide.shoeIndex].image}
                alt={SHOES[slide.shoeIndex].name}
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.4)" }}
              />
            </div>

            {/* Text — left panel */}
            <div className="relative z-10 flex flex-col justify-center px-12 md:px-20 max-w-lg">
              <p
                className="letter-in mb-4"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", color: "#b8924a", textTransform: "uppercase", opacity: 0 }}
              >
                {SHOES[slide.shoeIndex].style} · {SHOES[slide.shoeIndex].leather}
              </p>
              <h2
                className="slide-up mb-3"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  color: "#f2ede6",
                  fontStyle: "italic",
                  lineHeight: 1.05,
                  animationDelay: "0.15s",
                  opacity: 0,
                }}
              >
                {SHOES[slide.shoeIndex].name}
              </h2>
              <div className="h-px w-12 line-grow mb-4" style={{ background: "#b8924a", animationDelay: "0.3s" }} />
              <p
                className="slide-up"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8rem",
                  color: "#7a6f61",
                  lineHeight: 1.7,
                  maxWidth: "320px",
                  animationDelay: "0.4s",
                  opacity: 0,
                }}
              >
                {SHOES[slide.shoeIndex].description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {TRANSITION_SLIDES.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === slideIndex ? "20px" : "6px",
              height: "3px",
              borderRadius: "2px",
              background: i === slideIndex ? "#b8924a" : "#3a3530",
              transition: "all 0.4s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── BESPOKE BUTTON ───────────────────────────────────────────────────────────

function BespokeButton({ darkMode = false }: { darkMode?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const fg = darkMode ? "#f0ebe3" : "#1c1814";
  const bg = darkMode ? "#f0ebe3" : "#1c1814";
  const fgHovered = darkMode ? "#0f0d0a" : "#f2ede6";
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="text-xs tracking-widest uppercase px-4 py-2 border"
      style={{
        borderRadius: "1px",
        borderColor: fg,
        background: hovered ? bg : "transparent",
        color: hovered ? fgHovered : fg,
        transition: "background 0.2s ease, color 0.2s ease, border-color 0.4s ease",
      }}
    >
      Bespoke
    </button>
  );
}

// ── FAREWELL SCREEN ───────────────────────────────────────────────────────────

function FarewellScreen({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 60);
    const t2 = setTimeout(() => setVisible(false), 3000);
    const t3 = setTimeout(onComplete, 3700);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center gap-6"
      style={{
        background: "#0e0c0a",
        opacity: visible ? 1 : 0,
        transition: visible ? "opacity 0.7s ease" : "opacity 0.65s ease",
      }}
    >
      <style>{`
        @keyframes farewellUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes farewellLine {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .fw-line { animation: farewellLine 1s cubic-bezier(0.16,1,0.3,1) 0.4s forwards; transform: scaleX(0); transform-origin: center; }
        .fw-1 { animation: farewellUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s forwards; opacity: 0; }
        .fw-2 { animation: farewellUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s forwards; opacity: 0; }
        .fw-3 { animation: farewellUp 0.9s cubic-bezier(0.16,1,0.3,1) 0.7s forwards; opacity: 0; }
      `}</style>

      {/* Wordmark */}
      <p className="fw-1" style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.6rem",
        letterSpacing: "0.35em",
        color: "#c9a340",
        textTransform: "uppercase",
      }}>
        Sapatero Manila
      </p>

      {/* Main farewell */}
      <h1 className="fw-2" style={{
        fontFamily: "'Instrument Serif', serif",
        fontSize: "clamp(3rem, 8vw, 5.5rem)",
        fontStyle: "italic",
        color: "#f2ede6",
        lineHeight: 1.05,
        textAlign: "center",
      }}>
        Grazie
      </h1>

      {/* Ornamental line */}
      <div className="fw-line flex items-center gap-3" style={{ width: "160px" }}>
        <div className="flex-1 h-px" style={{ background: "#c9a340", opacity: 0.5 }} />
        <svg width="8" height="8" viewBox="0 0 8 8">
          <path d="M4 0 L5 3 L8 4 L5 5 L4 8 L3 5 L0 4 L3 3Z" fill="#c9a340" opacity="0.7"/>
        </svg>
        <div className="flex-1 h-px" style={{ background: "#c9a340", opacity: 0.5 }} />
      </div>

      {/* Subtitle */}
      <p className="fw-3" style={{
        fontFamily: "'Instrument Serif', serif",
        fontSize: "clamp(0.95rem, 2vw, 1.2rem)",
        fontStyle: "italic",
        color: "#7a6f61",
        textAlign: "center",
      }}>
        per la tua visita — a presto
      </p>
    </div>
  );
}

// ── CATALOG PAGE ─────────────────────────────────────────────────────────────

function CatalogPage({
  shoes,
  activeFilter,
  setActiveFilter,
  onLogout,
  darkMode,
  setDarkMode,
}: {
  shoes: typeof SHOES;
  activeFilter: string;
  setActiveFilter: (f: string) => void;
  onLogout: () => void;
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
}) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<Record<number, number>>({});
  const [mounted, setMounted] = useState(false);
  const [navHidden, setNavHidden] = useState(true);
  const [navRevealed, setNavRevealed] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 120);
    return () => clearTimeout(t);
  }, []);

  // Entrance: slide nav down after page fade-in begins
  useEffect(() => {
    const t = setTimeout(() => {
      setNavHidden(false);
      setNavRevealed(true);
    }, 350);
    return () => clearTimeout(t);
  }, []);

  // Scroll hide/show
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 10) {
        setNavHidden(false);
      } else if (y > lastScrollY.current + 6) {
        setNavHidden(true);
      } else if (y < lastScrollY.current - 4) {
        setNavHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = activeFilter === "All" ? shoes : shoes.filter(s => s.category === activeFilter);
  const getColor = (shoe: typeof SHOES[number]) => shoe.colors[selectedColor[shoe.id] ?? 0];
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [cardsVisible, setCardsVisible] = useState(true);
  const [filterAnimKey, setFilterAnimKey] = useState(0);

  const handleFilterChange = (f: string) => {
    if (f === activeFilter) return;
    setCardsVisible(false);                      // 1. fade grid out
    setTimeout(() => {
      setActiveFilter(f);                        // 2. swap cards (grid invisible — no flash)
      setFilterAnimKey(k => k + 1);             //    force card remount → fresh animation
      if (isFirstLoad) setIsFirstLoad(false);
      setTimeout(() => setCardsVisible(true), 40); // 3. fade grid back in with cards animating up
    }, 220);
  };

  // Dark mode palette
  const d = {
    bg:         darkMode ? "#0f0d0a" : "#f2ede6",
    fg:         darkMode ? "#f0ebe3" : "#1c1814",
    card:       darkMode ? "#1c1814" : "#faf7f2",
    cardBorder: darkMode ? "rgba(240,235,227,0.07)" : "rgba(28,24,20,0.09)",
    muted:      darkMode ? "#8a7f72" : "#7a6f61",
    nav:        darkMode ? "rgba(15,13,10,0.96)" : "rgba(242,237,230,0.92)",
    navBorder:  darkMode ? "rgba(240,235,227,0.07)" : "rgba(28,24,20,0.1)",
    input:      darkMode ? "#251f1a" : "#ede7de",
    filterActive: darkMode ? "#f0ebe3" : "#1c1814",
    filterActiveFg: darkMode ? "#0f0d0a" : "#f2ede6",
    filterBorder: darkMode ? "rgba(240,235,227,0.2)" : "rgba(28,24,20,0.18)",
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: d.bg,
        fontFamily: "'Inter', sans-serif",
        opacity: mounted ? 1 : 0,
        transition: "opacity 1.1s ease, background 0.5s ease",
      }}
    >
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        body {
          overscroll-behavior-y: none;
        }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(28,24,20,0.15); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(28,24,20,0.28); }

        .product-card { transition: transform 0.4s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.4s ease, border-color 0.3s ease; box-shadow: 0 2px 8px rgba(28,24,20,0.06); }
        .product-card:hover { transform: translateY(-5px); box-shadow: 0 16px 48px rgba(28,24,20,0.13), 0 4px 16px rgba(28,24,20,0.07); border-color: rgba(28,24,20,0.18) !important; }
        .gold-bar { transform: scaleX(0); transform-origin: left; transition: transform 0.35s ease; }
        .product-card:hover .gold-bar { transform: scaleX(1); }
        .swatch { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .swatch:hover { transform: scale(1.25); }
        .discover-btn { transition: gap 0.2s ease, color 0.2s ease; }
        .discover-btn:hover { gap: 10px; color: #b8924a; }
        .filter-btn { transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease, background 0.2s ease, color 0.2s ease, border-color 0.2s ease; }
        .filter-btn:hover { transform: scale(1.06) translateY(-2px); box-shadow: 0 4px 14px rgba(28,24,20,0.12); }
        .filter-btn:active { transform: scale(0.97) translateY(0px); box-shadow: none; }
        @keyframes catalogFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes catalogFadeDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .section-enter { animation: catalogFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards; opacity: 0; }
        .nav-enter     { animation: catalogFadeDown 0.7s cubic-bezier(0.16,1,0.3,1) forwards; opacity: 0; }
        .card-appear        { animation: catalogFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards; opacity: 0; }
      `}</style>

      {/* ── Navigation ── */}
      <nav
        className="sticky top-0 z-40 flex items-center justify-between px-8 md:px-14 h-16 border-b"
        style={{
          background: d.nav,
          backdropFilter: "blur(12px)",
          borderColor: d.navBorder,
          opacity: navRevealed ? 1 : 0,
          transform: navHidden ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease, background 0.4s ease",
          willChange: "transform",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-sm flex items-center justify-center" style={{ background: d.fg }}>
            <span style={{ color: d.bg, fontSize: "0.6rem", fontWeight: 600 }}>S</span>
          </div>
          <span style={{ fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.05em", color: d.fg }}>
            Sapatero
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Collezione", "Atelier", "Heritage", "Contatti"].map(item => (
            <button key={item}
              className="text-xs tracking-widest uppercase transition-opacity duration-150 hover:opacity-50"
              style={{ color: d.fg }}
            >{item}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center justify-center w-8 h-8 transition-opacity duration-150 hover:opacity-60"
            style={{ color: "#c9a340" }}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={15}/> : <Moon size={15}/>}
          </button>
          <BespokeButton darkMode={darkMode}/>
          <button
            onClick={onLogout}
            className="text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-200"
            style={{ borderColor: darkMode ? "rgba(240,235,227,0.2)" : "rgba(28,24,20,0.3)", color: d.muted, borderRadius: "1px" }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "#c0392b";
              (e.currentTarget as HTMLButtonElement).style.color = "#f0ebe3";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "#c0392b";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = d.muted;
              (e.currentTarget as HTMLButtonElement).style.borderColor = darkMode ? "rgba(240,235,227,0.2)" : "rgba(28,24,20,0.3)";
            }}
          >
            Esci
          </button>
        </div>
      </nav>

      {/* Pull-down tab */}
      <button
        onClick={() => setNavHidden(false)}
        style={{
          position: "fixed", top: 0, left: "50%",
          transform: navHidden && navRevealed ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-110%)",
          transition: "transform 0.55s cubic-bezier(0.4,0,0.2,1), background 0.4s ease",
          willChange: "transform", zIndex: 39,
          background: d.nav, backdropFilter: "blur(12px)",
          border: `1px solid ${d.navBorder}`, borderTop: "none",
          borderRadius: "0 0 20px 20px", padding: "5px 20px 8px",
          cursor: "pointer", display: "flex", alignItems: "center", gap: "5px",
          pointerEvents: navHidden && navRevealed ? "auto" : "none",
        }}
        aria-label="Show navigation"
      >
        <span style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: d.muted, fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Menu</span>
        <ChevronDown size={11} style={{ color: "#c9a340", marginTop: "1px" }}/>
      </button>

      {/* ── Hero ── */}
      <header className="section-enter px-8 md:px-14 pt-16 pb-12 border-b" style={{ borderColor: d.navBorder, animationDelay: "0.65s" }}>
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "#c9a340", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          Manila · Makati · BGC · Alabang
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(2.4rem, 5vw, 4rem)", fontStyle: "italic", color: d.fg, lineHeight: 1.1, transition: "color 0.4s ease" }}>
            La Collezione
          </h1>
          <p style={{ fontSize: "0.8rem", color: d.muted, maxWidth: "360px", lineHeight: 1.7, transition: "color 0.4s ease" }}>
            Each piece is made by hand in our Italian ateliers. From the selection of hides to the final burnish, no step is delegated to a machine.
          </p>
        </div>
      </header>

      {/* ── Filters ── */}
      <div className="section-enter px-8 md:px-14 py-5 flex items-center gap-2 border-b overflow-x-auto" style={{ borderColor: d.navBorder, animationDelay: "1s" }}>
        <SlidersHorizontal size={13} style={{ color: "#c9a340", flexShrink: 0 }} />
        <div className="flex gap-2 ml-2">
          {FILTERS.map(f => (
            <button key={f} onClick={() => handleFilterChange(f)}
              className="filter-btn text-xs whitespace-nowrap px-4 py-1.5"
              style={{
                fontWeight: 500, letterSpacing: "0.08em", borderRadius: "1px",
                border: `1px solid ${activeFilter === f ? d.filterActive : d.filterBorder}`,
                background: activeFilter === f ? d.filterActive : "transparent",
                color: activeFilter === f ? d.filterActiveFg : d.muted,
                transition: "all 0.25s ease",
              }}
            >{f}</button>
          ))}
        </div>
      </div>

      {/* ── Product Grid ── */}
      <main className="section-enter px-8 md:px-14 py-12" style={{ animationDelay: "1.3s" }}>
        <div
          className="grid gap-8"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            opacity: cardsVisible ? 1 : 0,
            transition: "opacity 0.22s ease",
          }}
        >
          {filtered.map((shoe, i) => (
            <div
              key={`${shoe.id}-${filterAnimKey}`}
              className="product-card card-appear overflow-hidden cursor-pointer"
              style={{
                borderRadius: "2px",
                border: `1px solid ${d.cardBorder}`,
                background: d.card,
                animationDelay: isFirstLoad ? `${1.4 + i * 0.12}s` : `${i * 0.07}s`,
                transition: "transform 0.4s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.4s ease, border-color 0.3s ease, background 0.4s ease",
              }}
              onMouseEnter={() => setHoveredId(shoe.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/5", background: darkMode ? "#251f1a" : "#e8e0d4" }}>
                <img src={shoe.image} alt={shoe.name} className="w-full h-full object-cover"
                  style={{ transform: hoveredId === shoe.id ? "scale(1.04)" : "scale(1)", transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1)", filter: darkMode ? "brightness(0.75) contrast(1.1)" : "brightness(0.96) contrast(1.05)" }}
                />
                <div className="absolute top-3 left-3 px-2 py-1" style={{ background: "rgba(14,12,10,0.7)", backdropFilter: "blur(4px)" }}>
                  <span style={{ fontSize: "0.55rem", letterSpacing: "0.2em", color: "#c9a340", textTransform: "uppercase" }}>{shoe.origin}</span>
                </div>
                <div className="absolute bottom-3 right-3 px-2.5 py-1.5" style={{ background: d.card }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 500, color: d.fg }}>{shoe.price}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="gold-bar h-px mb-4" style={{ background: "#c9a340" }} />
                <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.25rem", fontStyle: "italic", color: d.fg, lineHeight: 1.2, marginBottom: "0.1rem" }}>
                  {shoe.name}
                </h3>
                <p style={{ fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c9a340", marginBottom: "0.75rem" }}>
                  {shoe.style}
                </p>
                <div className="flex flex-col gap-1 mb-4" style={{ borderTop: `1px solid ${d.cardBorder}`, paddingTop: "0.75rem" }}>
                  {[["Pelle", shoe.leather], ["Costr.", shoe.construction], ["Fodera", shoe.lining], ["Suola", shoe.sole]].map(([label, value]) => (
                    <div key={label} className="flex justify-between">
                      <span style={{ fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#c9a340" }}>{label}</span>
                      <span style={{ fontSize: "0.7rem", color: d.muted }}>{value}</span>
                    </div>
                  ))}
                </div>

                {/* Color swatches */}
                <div className="flex items-center gap-2 mb-5">
                  {shoe.colors.map((color, ci) => (
                    <button
                      key={color.name}
                      className="swatch"
                      title={color.name}
                      onClick={() => setSelectedColor(prev => ({ ...prev, [shoe.id]: ci }))}
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        background: color.hex,
                        border: (selectedColor[shoe.id] ?? 0) === ci
                          ? `2px solid #b8924a`
                          : `2px solid transparent`,
                        outline: `1px solid rgba(28,24,20,0.2)`,
                        boxShadow: (selectedColor[shoe.id] ?? 0) === ci ? `0 0 0 2px ${color.hex}40` : "none",
                      }}
                    />
                  ))}
                  <span style={{ fontSize: "0.65rem", color: "#b8924a", marginLeft: "4px" }}>
                    {getColor(shoe).name}
                  </span>
                </div>

                {/* CTA */}
                <button
                  className="discover-btn flex items-center gap-1.5 text-xs tracking-widest uppercase"
                  style={{ color: "#1c1814", fontWeight: 500 }}
                >
                  Scopri <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer ornament */}
        <div className="flex items-center justify-center gap-4 mt-20 mb-4 opacity-30">
          <div className="h-px flex-1 max-w-[120px]" style={{ background: "#b8924a" }} />
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M5 0 L6.2 3.8 L10 5 L6.2 6.2 L5 10 L3.8 6.2 L0 5 L3.8 3.8 Z" fill="#b8924a" />
          </svg>
          <div className="h-px flex-1 max-w-[120px]" style={{ background: "#b8924a" }} />
        </div>
        <p className="text-center" style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#b8924a", opacity: 0.4 }}>
          Sapatero · Artigianato Italiano dal 1952
        </p>
      </main>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<"login" | "transition" | "catalog" | "farewell">("login");
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [slideIndex, setSlideIndex] = useState(0);
  const [slideVisible, setSlideVisible] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (email === "carlos@email.com" && password === "1234") {
      setIsLoading(true);
      setTimeout(() => setScreen("transition"), 900);
    } else {
      setLoginError("Credenziali non valide. Riprova.");
    }
  };

  useEffect(() => {
    if (screen !== "transition") return;
    setSlideIndex(0);
    setSlideVisible(true);

    const DISPLAY = 2300;
    const FADE = 380;
    const N = TRANSITION_SLIDES.length;
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 0; i < N; i++) {
      timers.push(setTimeout(() => setSlideVisible(false), i * (DISPLAY + FADE) + DISPLAY));
      if (i < N - 1) {
        timers.push(setTimeout(() => {
          setSlideIndex(i + 1);
          setSlideVisible(true);
        }, (i + 1) * (DISPLAY + FADE)));
      }
    }
    timers.push(setTimeout(() => setScreen("catalog"), N * (DISPLAY + FADE)));
    return () => timers.forEach(clearTimeout);
  }, [screen]);

  if (screen === "transition") return <TransitionScreen slideIndex={slideIndex} visible={slideVisible} />;
  if (screen === "farewell") return (
    <FarewellScreen onComplete={() => {
      setEmail(""); setPassword(""); setLoginError(""); setIsLoading(false);
      setScreen("login");
    }}/>
  );
  if (screen === "catalog") return (
    <CatalogPage
      shoes={SHOES}
      activeFilter={activeFilter}
      setActiveFilter={setActiveFilter}
      onLogout={() => setScreen("farewell")}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    />
  );

  // ── Login screen ─────────────────────────────────────────────────────────

  return (
    <div className="size-full min-h-screen grid grid-cols-1 lg:grid-cols-2" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Left panel */}
      <div
        className="panel-float-left hidden lg:flex flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "#1a1916", boxShadow: "12px 0 120px 40px rgba(0,0,0,0.55)" }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <style>{`
            @keyframes slowPan {
              0%   { transform: translate(0%, 0%) scale(1.18); }
              50%  { transform: translate(-4%, -3%) scale(1.18); }
              100% { transform: translate(0%, 0%) scale(1.18); }
            }
            .bg-pan { animation: slowPan 30s ease-in-out infinite; }
            @keyframes floatLeft {
              0%   { transform: translate(0px, 0px); }
              33%  { transform: translate(-2px, 1.5px); }
              66%  { transform: translate(1px, -1px); }
              100% { transform: translate(0px, 0px); }
            }
            @keyframes floatRight {
              0%   { transform: translate(0px, 0px); }
              33%  { transform: translate(1.5px, -1px); }
              66%  { transform: translate(-1px, 1.5px); }
              100% { transform: translate(0px, 0px); }
            }
            .panel-float-left  { animation: floatLeft  28s ease-in-out infinite; transition: transform 0.6s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.5s ease; }
            .panel-float-right { animation: floatRight 28s ease-in-out infinite; }
            .panel-float-left:hover  { animation-play-state: paused; transform: scale(1.012) translateY(-3px); box-shadow: 16px 0 140px 60px rgba(0,0,0,0.65) !important; }
            .btn-pop { transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease; }
            .btn-pop:hover  { transform: scale(1.025) translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.15); }
            .btn-pop:active { transform: scale(0.975) translateY(0px); box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
            @keyframes logoFloat {
              0%, 100% { transform: translateY(0px) scale(1); }
              50%       { transform: translateY(-5px) scale(1.015); }
            }
            @keyframes circleSpin {
              from { transform: rotate(0deg); }
              to   { transform: rotate(360deg); }
            }
            @keyframes logoGlow {
              0%, 100% { opacity: 0.85; }
              50%       { opacity: 1; }
            }
            .logo-float      { animation: logoFloat  5s ease-in-out infinite; }
            .logo-circle-spin { animation: circleSpin 30s linear infinite; transform-origin: 50% 50%; }
            .logo-glow        { animation: logoGlow   5s ease-in-out infinite; }
            @keyframes shoeFloat {
              0%   { transform: translateY(0px) rotate(-0.5deg); }
              50%  { transform: translateY(-6px) rotate(0.5deg); }
              100% { transform: translateY(0px) rotate(-0.5deg); }
            }
            @keyframes shoeShadow {
              0%   { transform: scaleX(1);   opacity: 0.18; }
              50%  { transform: scaleX(0.78); opacity: 0.08; }
              100% { transform: scaleX(1);   opacity: 0.18; }
            }
            @keyframes shoeGleam {
              0%   { opacity: 0; transform: translateX(-40px); }
              15%  { opacity: 0.55; }
              40%  { opacity: 0; transform: translateX(60px); }
              100% { opacity: 0; transform: translateX(60px); }
            }
            @keyframes brogueGlow {
              0%, 100% { opacity: 0.45; }
              50%       { opacity: 0.9; }
            }
            .shoe-float  { animation: shoeFloat  4s ease-in-out infinite; }
            .shoe-shadow { animation: shoeShadow 4s ease-in-out infinite; }
            .shoe-gleam  { animation: shoeGleam  5s ease-in-out infinite; animation-delay: 1.2s; }
            .brogue-dot  { animation: brogueGlow 4s ease-in-out infinite; }
            .brogue-dot:nth-child(2) { animation-delay: 0.3s; }
            .brogue-dot:nth-child(3) { animation-delay: 0.6s; }
            .brogue-dot:nth-child(4) { animation-delay: 0.9s; }
            .brogue-dot:nth-child(5) { animation-delay: 1.2s; }
          `}</style>
          <img
            src="https://images.unsplash.com/photo-1777987601426-c05a82045862?w=1400&h=1000&fit=crop&auto=format"
            alt=""
            aria-hidden="true"
            className="bg-pan absolute inset-0 w-full h-full object-cover opacity-[0.13]"
          />
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-sm flex items-center justify-center" style={{ background: "#c8a97e" }}>
            <span className="text-[#1a1916] text-xs font-semibold">S</span>
          </div>
          <span className="text-white/90 text-sm font-medium tracking-wide">Sapatero</span>
        </div>

        {/* Center quote */}
        <div className="relative z-10 max-w-sm">
          <p className="text-white/90 leading-snug mb-6"
            style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)", fontStyle: "italic" }}
          >
            "Every pair tells a story of{" "}
            <span style={{ color: "#c8a97e" }}>hands that have mastered</span>{" "}
            their craft over generations."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0" style={{ background: "#3a3832" }}>
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&fit=crop&auto=format"
                alt="Marco Ferretti"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-white/80 text-sm font-medium">Marco Ferretti</p>
              <p className="text-white/40 text-xs">Master Cobbler, Bottega Ferretti — Florence</p>
            </div>
          </div>
        </div>

        <p className="relative z-10 text-white/25 text-xs tracking-widest uppercase">
          © 2026 Sapatero — Artigianato Italiano
        </p>
      </div>

      {/* Right panel — form */}
      <div
        className="panel-float-right flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden"
        style={{ background: darkMode ? "#15120f" : "#f2ede6", transition: "background 0.4s ease" }}
      >
        {/* Corner flourishes — pointer-events-none so they never block clicks */}
        <svg className="absolute top-5 left-5 opacity-20 pointer-events-none" width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M2 46 L2 2 L46 2" stroke="#b8924a" strokeWidth="1.5" fill="none"/>
          <path d="M2 38 L2 10 L10 2" stroke="#b8924a" strokeWidth="0.75" fill="none" strokeDasharray="2 3"/>
        </svg>
        <svg className="absolute top-5 right-5 opacity-20 pointer-events-none" width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M46 46 L46 2 L2 2" stroke="#b8924a" strokeWidth="1.5" fill="none"/>
          <path d="M46 38 L46 10 L38 2" stroke="#b8924a" strokeWidth="0.75" fill="none" strokeDasharray="2 3"/>
        </svg>
        <svg className="absolute bottom-5 left-5 opacity-20 pointer-events-none" width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M2 2 L2 46 L46 46" stroke="#b8924a" strokeWidth="1.5" fill="none"/>
          <path d="M2 10 L2 38 L10 46" stroke="#b8924a" strokeWidth="0.75" fill="none" strokeDasharray="2 3"/>
        </svg>
        <svg className="absolute bottom-5 right-5 opacity-20 pointer-events-none" width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M46 2 L46 46 L2 46" stroke="#b8924a" strokeWidth="1.5" fill="none"/>
          <path d="M46 10 L46 38 L38 46" stroke="#b8924a" strokeWidth="0.75" fill="none" strokeDasharray="2 3"/>
        </svg>

        {/* Dark mode toggle — rendered after flourishes so it sits on top */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-5 right-5 flex items-center justify-center w-8 h-8 transition-opacity duration-150 hover:opacity-60"
          style={{ color: "#c9a340", zIndex: 10 }}
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={16}/> : <Moon size={16}/>}
        </button>

        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-10">
          <div className="w-7 h-7 rounded-sm flex items-center justify-center" style={{ background: "#1c1814" }}>
            <span className="text-[#f2ede6] text-xs font-semibold">S</span>
          </div>
          <span className="text-foreground text-sm font-medium tracking-wide">Sapatero</span>
        </div>

        <div className="w-full max-w-[360px]">

          {/* Sapatero logo emblem — animated */}
          <div className="logo-float logo-glow flex flex-col items-center mb-8">

            <div style={{ position: "relative", width: "116px", height: "116px" }}>

              {/* Hammer image — green + white removed, clipped to circle */}
              <svg
                style={{ position: "absolute", top: "8px", left: "8px" }}
                width="100" height="100" viewBox="0 0 100 100"
              >
                <defs>
                  <filter id="goldHammerFilter" colorInterpolationFilters="sRGB"
                    x="0%" y="0%" width="100%" height="100%">
                    {/* Step 1 — isolate hammer silhouette via alpha:
                        A = 2R − 2B → white(R=B)→0, green(R<B)→0, gold(R>>B)→1 */}
                    <feColorMatrix type="matrix" in="SourceGraphic" result="alphaMap"
                      values="0 0 0 0 0
                              0 0 0 0 0
                              0 0 0 0 0
                              2 0 -2 0 0"/>
                    {/* Step 2 — sharpen alpha edge: removes all fringe/halo */}
                    <feComponentTransfer in="alphaMap" result="cleanMask">
                      <feFuncA type="linear" slope="8" intercept="-1.5"/>
                    </feComponentTransfer>
                    {/* Step 3 — flood exact animation gold */}
                    <feFlood floodColor="#c9a340" floodOpacity="1" result="goldFill"/>
                    {/* Step 4 — mask gold with hammer silhouette */}
                    <feComposite in="goldFill" in2="cleanMask" operator="in"/>
                  </filter>
                  {/* Clip to circle — removes octagon border entirely */}
                  <clipPath id="hammerCircle">
                    <circle cx="50" cy="50" r="47"/>
                  </clipPath>
                </defs>
                <image
                  href={sapateroHammers}
                  x="0" y="0" width="100" height="100"
                  filter="url(#goldHammerFilter)"
                  clipPath="url(#hammerCircle)"
                  preserveAspectRatio="xMidYMid meet"
                />
              </svg>

              {/* Spinning dotted ring — sits on top */}
              <svg
                className="logo-circle-spin"
                style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
                width="116" height="116" viewBox="0 0 116 116"
              >
                <circle cx="58" cy="58" r="55" stroke="#c9a340" strokeWidth="1.5"
                  strokeDasharray="2.6 3.2" fill="none"/>
              </svg>

            </div>

            {/* SAPATERO wordmark */}
            <p style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "1rem",
              letterSpacing: "0.42em",
              color: "#c9a340",
              textTransform: "uppercase",
              marginTop: "0.6rem",
              fontWeight: 400,
              paddingLeft: "0.42em",
            }}>
              Sapatero
            </p>

            {/* Thin ornamental rule */}
            <div className="flex items-center gap-2.5 w-full mt-4">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #c9a34055)" }} />
              <svg width="8" height="8" viewBox="0 0 8 8">
                <path d="M4 0 L5 3 L8 4 L5 5 L4 8 L3 5 L0 4 L3 3Z" fill="#c9a340" opacity="0.5"/>
              </svg>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #c9a34055)" }} />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="mb-2" style={{ fontFamily: "'Instrument Serif', serif", fontSize: "2rem", fontWeight: 400, lineHeight: 1.15, color: darkMode ? "#f0ebe3" : "#1c1814", transition: "color 0.4s ease" }}>
              Benvenuto
            </h1>
            <p className="text-sm" style={{ color: darkMode ? "#8a7f72" : "#7a6f61", transition: "color 0.4s ease" }}>
              Sign in to your private atelier account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-medium tracking-widest uppercase" style={{ color: "#c9a340" }}>Email Address</label>
              <input id="email" type="email" value={email}
                onChange={(e) => { setEmail(e.target.value); setLoginError(""); }}
                placeholder="yourname@email.com" required
                className="w-full h-11 px-3.5 text-sm placeholder:opacity-40 border transition-all duration-150 focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ borderColor: darkMode ? "rgba(240,235,227,0.12)" : "rgba(28,24,20,0.18)", borderRadius: "2px", background: darkMode ? "#201c18" : "#faf7f2", color: darkMode ? "#f0ebe3" : "#1c1814", "--tw-ring-color": "#c9a340" } as React.CSSProperties}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-medium tracking-widest uppercase" style={{ color: "#c9a340" }}>Password</label>
                <button type="button" className="text-xs transition-colors duration-150" style={{ color: "#c9a340", opacity: 0.7 }}>Forgot?</button>
              </div>
              <div className="relative">
                <input id="password" type={showPassword ? "text" : "password"} value={password}
                  onChange={(e) => { setPassword(e.target.value); setLoginError(""); }}
                  placeholder="••••••••" required
                  className="w-full h-11 px-3.5 pr-10 text-sm placeholder:opacity-40 border transition-all duration-150 focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ borderColor: darkMode ? "rgba(240,235,227,0.12)" : "rgba(28,24,20,0.18)", borderRadius: "2px", background: darkMode ? "#201c18" : "#faf7f2", color: darkMode ? "#f0ebe3" : "#1c1814" } as React.CSSProperties}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-150"
                  style={{ color: darkMode ? "#8a7f72" : "#7a6f61" }}
                >{showPassword ? <EyeOff size={15}/> : <Eye size={15}/>}</button>
              </div>
            </div>

            {loginError && (
              <div className="flex items-center gap-2 px-3 py-2" style={{ background: "rgba(192,57,43,0.10)", border: "1px solid rgba(192,57,43,0.25)", borderRadius: "2px" }}>
                <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#c0392b" }}/>
                <p style={{ fontSize: "0.72rem", color: "#c0392b" }}>{loginError}</p>
              </div>
            )}

            <button type="submit" disabled={isLoading}
              className="btn-pop w-full h-11 mt-1 text-sm font-medium tracking-widest uppercase flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: darkMode ? "#f0ebe3" : "#1c1814", color: darkMode ? "#0f0d0a" : "#f2ede6", borderRadius: "2px", letterSpacing: "0.15em", transition: "background 0.4s ease, color 0.4s ease" }}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                  </svg>
                  Entering…
                </span>
              ) : (<>Enter <ArrowRight size={14}/></>)}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: darkMode ? "rgba(240,235,227,0.1)" : "rgba(28,24,20,0.12)" }}/>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rotate-45" style={{ background: "#c9a340", opacity: 0.5 }}/>
              <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: darkMode ? "#8a7f72" : "#7a6f61" }}>or</span>
              <div className="w-1 h-1 rotate-45" style={{ background: "#c9a340", opacity: 0.5 }}/>
            </div>
            <div className="flex-1 h-px" style={{ background: darkMode ? "rgba(240,235,227,0.1)" : "rgba(28,24,20,0.12)" }}/>
          </div>

          <div className="space-y-2.5">
            {[
              { label: "Continue with Google", icon: <svg width="15" height="15" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> },
              { label: "Continue with Facebook", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" fill="#1877F2"/></svg> },
            ].map(({ label, icon }) => (
              <button key={label} type="button"
                className="btn-pop w-full h-11 border text-sm font-medium flex items-center justify-center gap-2.5 transition-colors"
                style={{ background: darkMode ? "#201c18" : "#faf7f2", borderColor: darkMode ? "rgba(240,235,227,0.1)" : "rgba(28,24,20,0.16)", borderRadius: "2px", color: darkMode ? "#f0ebe3" : "#1c1814" }}
              >{icon}{label}</button>
            ))}
          </div>

          <p className="mt-7 text-center text-xs" style={{ color: darkMode ? "#8a7f72" : "#7a6f61" }}>
            New to Sapatero?{" "}
            <button type="button" className="font-medium transition-opacity duration-150 hover:opacity-70"
              style={{ color: "#c9a340", textDecoration: "underline", textUnderlineOffset: "3px" }}>
              Request an invitation
            </button>
          </p>

          <div className="mt-8 flex items-center justify-center gap-2 opacity-30">
            <div className="h-px w-8" style={{ background: "#b8924a" }} />
            <svg width="8" height="8" viewBox="0 0 8 8">
              <path d="M4 0 L5 3 L8 4 L5 5 L4 8 L3 5 L0 4 L3 3 Z" fill="#b8924a"/>
            </svg>
            <div className="h-px w-8" style={{ background: "#b8924a" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
