import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', id: 'home', href: '#home' },
    { name: 'About', id: 'about', href: '#about' },
    { name: 'Eligibility', id: 'eligibility', href: '#eligibility' },
    { name: 'Tracks', id: 'tracks', href: '#tracks' },
    { name: 'Schedule', id: 'schedule', href: '#schedule' },
    { name: 'Prize Pool', id: 'awards', href: '#awards' },
    { name: 'FAQ', id: 'faq', href: '#faq' },
    { name: 'Contact', id: 'contact', href: '#contact' },
  ];

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // If scrolled near top of page (Hero section), directly activate 'home'
          if (window.scrollY < 80) {
            setActiveSection('home');
            ticking = false;
            return;
          }

          // If scrolled near bottom of page (CTA / Footer area), directly activate 'contact'
          const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
          if (isAtBottom) {
            setActiveSection('contact');
            ticking = false;
            return;
          }

          const scrollPosition = window.scrollY + 140;

          for (let i = navLinks.length - 1; i >= 0; i--) {
            const section = document.getElementById(navLinks[i].id);
            if (section && section.offsetTop <= scrollPosition) {
              setActiveSection((prev) => (prev !== navLinks[i].id ? navLinks[i].id : prev));
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    // Target date: 30 September 2026, 11:59 PM
    const targetDate = new Date('2026-09-30T23:59:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  const DigitalCard = ({ value, label }: { value: number, label: string }) => {
    const formattedValue = value.toString().padStart(2, '0');
    return (
      <div className="flex flex-col items-center mx-[3px] sm:mx-1">
        <span className="font-mono font-bold text-xs sm:text-[13px] xl:text-[14px] text-black leading-none tracking-widest">
          {formattedValue}
        </span>
        <span className="text-[6px] sm:text-[7px] xl:text-[7.5px] font-bold tracking-[0.1em] text-black/70 mt-[1.5px] uppercase leading-none">
          {label}
        </span>
      </div>
    );
  };

  const TimerPanel = () => (
    <div className="stamp-card-wrapper drop-shadow-[0_2px_5px_rgba(0,0,0,0.18)] shrink-0 whitespace-nowrap select-none px-1 py-0.5">
      <div className="stamp-card-mini flex flex-col justify-center bg-[#F8E7BE] px-2.5 sm:px-3 py-1 sm:py-1.5 w-auto border border-black/5 shrink-0 whitespace-nowrap select-none">
        
        {/* Top Header Row */}
        <div className="flex justify-between items-center w-full mb-[2px] sm:mb-[3px] z-10 gap-1.5 sm:gap-2.5 px-[1px]">
          <div className="text-[5px] sm:text-[6px] xl:text-[7px] font-mono text-black/80 tracking-widest uppercase font-bold leading-none mt-px">
            [ REGISTRATION DEADLINE ]
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <motion.div 
              animate={{ opacity: [1, 0.2, 1] }} 
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1 rounded-full bg-red-600 shadow-xs"
            />
            <span className="text-[5px] sm:text-[6px] xl:text-[7px] font-mono text-red-600 tracking-widest font-bold leading-none mt-px">LIVE</span>
          </div>
        </div>

        {/* Bottom Countdown Row (Days, Hours, Minutes) */}
        <div className="flex items-center justify-center z-10">
          <DigitalCard value={timeLeft.days} label="DAYS" />
          <span className="text-black/40 font-mono font-bold text-[10px] sm:text-xs xl:text-sm mb-[2px] sm:mb-[3px] animate-pulse leading-none mx-[1px]">:</span>
          <DigitalCard value={timeLeft.hours} label="HRS" />
          <span className="text-black/40 font-mono font-bold text-[10px] sm:text-xs xl:text-sm mb-[2px] sm:mb-[3px] animate-pulse leading-none mx-[1px]">:</span>
          <DigitalCard value={timeLeft.minutes} label="MIN" />
        </div>
      </div>
    </div>
  );

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setActiveSection(id);

    const scrollToDestination = () => {
      if (id === 'contact') {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 55;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    };

    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      // Wait slightly for the mobile menu to unmount before scrolling
      setTimeout(scrollToDestination, 150);
    } else {
      scrollToDestination();
    }
  };

  return (
    <>
      <motion.header
        className="w-full max-w-full sticky top-0 z-[70] bg-[#0A2A5E] text-white h-[56px] min-h-[56px] max-h-[56px] flex flex-col justify-center transition-all duration-300"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 md:px-12 flex justify-between items-center relative w-full h-full">
          {/* Left: Logos */}
          <div className="flex items-center space-x-2 sm:space-x-2.5 shrink-0 z-10">
            <a 
              href="https://slrtce.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group hover:opacity-80 transition-opacity"
            >
              <img
                src="/slrtce-logo.png"
                alt="SLRTCE Logo"
                className="h-8 sm:h-9 w-auto object-contain"
              />
            </a>
            <div className="h-6 sm:h-7 w-px bg-white/30" />
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, '#home', 'home')} 
              className="group hover:opacity-80 transition-opacity"
            >
              <img
                src="/ieee-custom-logo-white.png"
                alt="IEEE SLRTCE Custom Logo"
                className="h-9 sm:h-10 w-auto object-contain mix-blend-screen opacity-90"
              />
            </a>
          </div>

          {/* Center: Main Navigation */}
          <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 space-x-0.5 xl:space-x-1.5 items-center font-sans font-bold text-[0.66rem] xl:text-[0.74rem] tracking-wide z-10 pointer-events-auto">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.id)}
                className={`transition-all px-2 xl:px-2.5 py-1 rounded-full whitespace-nowrap ${
                  activeSection === link.id 
                    ? 'bg-white text-[#0A2A5E] shadow-sm scale-105' 
                    : 'text-white/95 hover:text-white hover:bg-white/15'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Center Timer */}
          <div className="absolute left-[49%] sm:left-[50%] -translate-x-1/2 lg:hidden z-10 flex items-center justify-center pointer-events-auto">
            <div className="flex items-center shrink-0 overflow-visible px-1">
              <TimerPanel />
            </div>
          </div>

          {/* Right: Counter Beside Register + Register Button */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4 shrink-0 z-10">
            
            {/* Terminal Style Timer Panel (Inline, ultra-compact) */}
            <div 
              className={`transition-all duration-300 ease-out flex items-center shrink-0 ${
                activeSection !== 'home'
                  ? 'opacity-100 scale-100 max-w-[240px] max-h-12 pointer-events-auto overflow-visible px-1'
                  : 'opacity-0 scale-95 max-w-0 max-h-0 pointer-events-none overflow-hidden'
              }`}
            >
              <TimerPanel />
            </div>

            <a 
              href="https://inspire-colloquium-registration-page.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF6B00] hover:bg-[#E65A00] text-white font-bold text-[11px] xl:text-xs px-3 xl:px-4 py-1 xl:py-1 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95 whitespace-nowrap"
            >
              Register Now →
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden z-10">
            <a 
              href="https://inspire-colloquium-registration-page.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF6B00] hover:bg-[#E65A00] text-white font-bold text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full transition-colors shadow-sm whitespace-nowrap cursor-pointer"
            >
              Register
            </a>
            <button
              className="p-1 sm:p-1.5 text-white focus:outline-none hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle Navigation Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="absolute top-full left-0 z-50 w-full max-h-[calc(100dvh-55px)] overflow-y-auto bg-[#0A2A5E] text-white shadow-2xl flex flex-col items-center py-4 space-y-1.5 lg:hidden border-t border-white/15"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors px-6 py-2 rounded-full w-[85%] text-center cursor-pointer ${
                    activeSection === link.id 
                      ? 'bg-white text-[#0A2A5E] font-bold shadow-sm' 
                      : 'text-white/90 hover:bg-white/10 hover:text-tricolor-saffron'
                  }`}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Realistic Code-Generated Hand-Torn Paper Deckle Edge */}
        <div className="absolute top-[calc(100%-5px)] left-0 w-full max-w-full overflow-visible pointer-events-none z-30">
          <svg
            viewBox="0 0 1440 45"
            preserveAspectRatio="none"
            className="w-full h-6 sm:h-7 md:h-8 block"
            style={{
              clipPath: 'polygon(0 4px, 100% 4px, 100% 120px, 0 120px)',
              filter: 'drop-shadow(0 3px 3px rgba(0, 0, 0, 0.12)) drop-shadow(0 1px 1px rgba(0, 0, 0, 0.08))',
              willChange: 'transform',
              transform: 'translateZ(0)'
            }}
          >
            <defs>
              {/* High-frequency cellulose pulp displacement filter for real fibrous paper tear */}
              <filter id="torn-paper-roughness" x="-2%" y="-15%" width="104%" height="150%">
                <feTurbulence type="fractalNoise" baseFrequency="0.14 0.22" numOctaves="5" seed="83" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" xChannelSelector="R" yChannelSelector="G" result="displaced" />
              </filter>
            </defs>

            {/* Layer 1: Exposed Unbleached Paper Core Deckle Fringe (raw paper pulp extending 2-4px past blue sheet) */}
            <path
              d="M 1440,0 L 1440,19.5 L 1422,22 L 1410,19.5 L 1395,23.5 L 1386,20 L 1370,22.5 L 1358,27.5 L 1345,25 L 1334,19.5 L 1320,19 L 1308,22.5 L 1295,29 L 1282,33 L 1275,29 L 1264,33.5 L 1252,27.5 L 1240,21 L 1228,19.5 L 1215,22.5 L 1202,18 L 1190,20 L 1178,25.5 L 1165,30 L 1152,26 L 1140,30.5 L 1132,27 L 1120,22 L 1108,19.5 L 1095,18.5 L 1082,21 L 1070,19 L 1058,23.5 L 1045,27 L 1032,21 L 1020,19 L 1008,18 L 995,20.5 L 982,24 L 970,29 L 958,34 L 950,30.5 L 938,36 L 928,31.5 L 916,26 L 904,22 L 892,19 L 880,18 L 868,20.5 L 856,19 L 844,21 L 832,17.5 L 820,16 L 808,18 L 796,21 L 784,19 L 772,23.5 L 760,28.5 L 748,31 L 740,28 L 728,32.5 L 716,26 L 704,22 L 692,19 L 680,18 L 668,20 L 656,17.5 L 644,19 L 632,22.5 L 620,25.5 L 608,23 L 596,27.5 L 584,24 L 572,20 L 560,19 L 548,21.5 L 536,25.5 L 524,30.5 L 512,35 L 504,31 L 492,36 L 480,31 L 468,26 L 456,22 L 444,19 L 432,18.5 L 420,20 L 408,23.5 L 396,28 L 384,25 L 372,21 L 360,19.5 L 348,18 L 336,20 L 324,23 L 312,28 L 300,31 L 292,27.5 L 280,32 L 268,25 L 256,21 L 244,18 L 232,17 L 220,19 L 208,22.5 L 196,26 L 184,30 L 176,26 L 164,31 L 152,26 L 140,21 L 128,19 L 116,20.5 L 104,18 L 92,20 L 80,23 L 68,19 L 56,21 L 44,18.5 L 32,20 L 20,22.5 L 0,19.5 L 0,0 Z"
              fill="#F8E7BE"
              opacity="0.95"
              filter="url(#torn-paper-roughness)"
            />

            {/* Layer 2: Main Dark Blue Navy Paper (#0A2A5E) - Pure fill, zero top stroke */}
            <path
              d="M 1440,0 L 1440,16 L 1422,18.5 L 1410,16.5 L 1395,20 L 1386,17 L 1370,19.5 L 1358,23.5 L 1345,22 L 1334,17 L 1320,16 L 1308,19.5 L 1295,25 L 1282,28.5 L 1275,26 L 1264,29.5 L 1252,24 L 1240,18 L 1228,16.5 L 1215,19 L 1202,15 L 1190,17 L 1178,22 L 1165,26 L 1152,23 L 1140,26.5 L 1132,24 L 1120,19 L 1108,17 L 1095,15.5 L 1082,18 L 1070,16 L 1058,20 L 1045,23 L 1032,18 L 1020,16 L 1008,15 L 995,17.5 L 982,20.5 L 970,25 L 958,30 L 950,27 L 938,32 L 928,28 L 916,23 L 904,19 L 892,16 L 880,15 L 868,17.5 L 856,16 L 844,18 L 832,14.5 L 820,13 L 808,15 L 796,17.5 L 784,16 L 772,20 L 760,24.5 L 748,27.5 L 740,25 L 728,29 L 716,23 L 704,19 L 692,16 L 680,15 L 668,17 L 656,14.5 L 644,16 L 632,19 L 620,22 L 608,20 L 596,23.5 L 584,21 L 572,17 L 560,16 L 548,18.5 L 536,22 L 524,27 L 512,30.5 L 504,27.5 L 492,32.5 L 480,28 L 468,23 L 456,19 L 444,16 L 432,15.5 L 420,17 L 408,20.5 L 396,24.5 L 384,22 L 372,18 L 360,16.5 L 348,15 L 336,17 L 324,19.5 L 312,24.5 L 300,27.5 L 292,24.5 L 280,28.5 L 268,22 L 256,18 L 244,15 L 232,14 L 220,16 L 208,19 L 196,22.5 L 184,26.5 L 176,23 L 164,27.5 L 152,23 L 140,18 L 128,16 L 116,17.5 L 104,15 L 92,17 L 80,19.5 L 68,16 L 56,18 L 44,15.5 L 32,17 L 20,19 L 0,16.5 L 0,0 Z"
              fill="#0A2A5E"
              filter="url(#torn-paper-roughness)"
            />

          </svg>
        </div>
      </motion.header>
    </>
  );
};

export default Navbar;
