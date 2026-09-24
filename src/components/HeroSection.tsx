import { motion, useReducedMotion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import heritageCombinedImg from '../assets/heritage/heritage-combined-transparent.png';
import { Calendar, MapPin, Lightbulb, Cpu, Trophy, Users, Globe } from 'lucide-react';

const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const badgeXOffset = useTransform(dragX, (x) => x + 1000);
  const badgeYOffset = useTransform(dragY, (y) => y + 30);
  const lanyardPath = useMotionTemplate`M 1000 -500 L ${badgeXOffset} ${badgeYOffset}`;

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
  const [isExpired, setIsExpired] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Target date: 30 September 2026, 11:00 PM
    const targetDate = new Date('2026-09-30T23:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        });
        setIsExpired(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        setIsExpired(true);
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative w-full h-auto min-h-[calc(100vh-56px)] flex flex-col justify-between bg-[#F9E7B7] overflow-hidden">
      {/* Layer 1: Clean Paper Texture Background */}
      <div
        className="absolute inset-0 pointer-events-none z-0 bg-[#F9E7B7] bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: "url('/hero-bg.png')",
        }}
      />

      {/* Layer 2: Indian Heritage Skyline Layer — Continuous bottom decorative layer with entrance animation */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 w-full z-0 pointer-events-none overflow-hidden select-none"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
      >
        <img
          src={heritageCombinedImg}
          alt=""
          role="presentation"
          fetchPriority="high"
          decoding="async"
          className="w-full h-auto max-h-[140px] sm:max-h-[180px] md:max-h-[220px] lg:max-h-[250px] object-cover object-bottom translate-y-1 sm:translate-y-2 opacity-85"
        />
      </motion.div>

      {/* Layer 3: Foreground Hero Content */}
      <div className="relative z-10 w-[min(94%,1440px)] 2xl:w-[min(90%,1600px)] mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-12 sm:pb-16 lg:pb-20 flex-1 flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left max-w-5xl lg:max-w-6xl w-full mx-auto gap-8 lg:gap-12">

          {/* Left Column: Hero Content */}
          <motion.div
            className="hidden md:flex w-full md:w-[52%] lg:w-1/2 flex-col items-center md:items-start z-10"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.3 }
              }
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
              className="text-xs sm:text-sm md:text-base lg:text-lg font-extrabold uppercase tracking-widest mb-2 sm:mb-3 text-black drop-shadow-sm"
            >
              IEEE SLRTCE presents
            </motion.div>

            <div className="relative inline-block mb-7 sm:mb-9 md:mb-11">
              <h1 className="relative m-0 p-0 flex flex-col items-center justify-center md:items-start">
                <motion.span
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
                  }}
                  className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-black text-brand-navy drop-shadow-xl leading-tight uppercase font-sans text-center md:text-left"
                >
                  INSPIRE
                </motion.span>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
                  }}
                  className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-semibold text-brand-navy drop-shadow-xl leading-tight uppercase font-sans text-center md:text-left"
                >
                  Colloquium
                </motion.span>
              </h1>
            </div>

            <motion.h2
              className="text-base sm:text md:text lg:text xl:text font-semibold text-brand-navy mb-3 sm:mb-4 flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2, delayChildren: 0.3 }
                }
              }}
            >
              {[
                <span key="1">Inspiring Ideas</span>,
                <span key="2" className="text-brand-orange text-lg">·</span>,
                <span key="3">Enabling Innovation</span>,
                <span key="4" className="text-brand-orange text-lg">·</span>,
                <span key="5">Impacting Tomorrow</span>
              ].map((child) => (
                <motion.span
                  key={child.key}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                >
                  {child}
                </motion.span>
              ))}
            </motion.h2>

            <motion.p
              className="text-xs sm:text-sm md:text-base lg:text-[1.05rem] text-text-dark max-w-2xl mb-5 sm:mb-6 leading-relaxed font-normal text-center md:text-left"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
            >
              A national research and idea colloquium that empowers students and researchers to showcase research, present innovative concepts, and explore interdisciplinary, technology-driven solutions to real-world challenges, fostering meaningful technological and societal impact.
            </motion.p>

            <div className="flex flex-col items-center md:items-start gap-4 mb-3 w-full">
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4 w-full">
                {/* Registration Button: Light Orange Box, Blue Text */}
                <a href="https://inspire-colloquium-registration-page.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full sm:w-auto relative group px-7 sm:px-9 py-2.5 sm:py-3.5 bg-orange-400 hover:bg-orange-300 rounded-md shadow-md border border-orange-400 transition-all">
                  <span className="text-brand-navy font-extrabold text-sm sm:text-base tracking-wide transition-all">
                    Register Now
                  </span>
                  <span className="ml-2 font-bold text-brand-navy transition-colors">→</span>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-md"></div>
                </a>

                {/* Brochure Button: Blue Box, Light Orange Text */}
                <a href="/brochure.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full sm:w-auto relative group px-7 sm:px-9 py-2.5 sm:py-3.5 bg-brand-navy hover:bg-blue-900 rounded-md shadow-sm border border-brand-navy transition-all hover:shadow-md">
                  <span className="text-orange-400 font-bold text-sm sm:text-base tracking-wide flex items-center gap-2 group-hover:text-orange-300 transition-colors">
                    <svg className="w-4 h-4 text-orange-400 group-hover:text-orange-300 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Brochure
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-md"></div>
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-6 text-xs sm:text-sm font-semibold text-brand-navy mt-1">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 drop-shadow-md" strokeWidth={2.5} />
                  <span>3rd October 2026</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 drop-shadow-md" strokeWidth={2.5} />
                  <a
                    href="https://www.google.com/maps/search/Shree+L.R.+Tiwari+College+of+Engineering"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-orange hover:underline transition-all"
                  >
                    Shree L. R. Tiwari College of Engineering
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: ID Badge CSS Construction */}
          <motion.div
            ref={sceneRef}
            className="w-full md:w-[48%] lg:w-1/2 flex items-center justify-center z-10 mt-2 sm:mt-4 md:mt-0 relative h-full min-h-[360px]"
            initial={{ opacity: 1, y: -800 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, type: "spring", bounce: 0.25, delay: 0.4 }}
          >
            {/* Fixed Anchor Lanyard String */}
            <svg className="absolute top-0 left-1/2 w-[2000px] h-full -translate-x-1/2 pointer-events-none z-0 overflow-visible">
              <motion.path
                id="lanyard-path"
                d={lanyardPath}
                stroke="#0A2A5E"
                strokeWidth="16"
                strokeLinecap="round"
                fill="none"
              />
              <text fontSize="11" fill="rgba(255,255,255,0.7)" fontWeight="900" letterSpacing="6">
                <textPath href="#lanyard-path" startOffset="50%" textAnchor="middle">
                  SLRTCE • SLRTCE • SLRTCE
                </textPath>
              </text>
            </svg>

            {/* The Badge Itself */}
            <motion.div
              className={`relative w-[300px] sm:w-[340px] md:w-[330px] lg:w-[350px] xl:w-[370px] h-auto bg-brand-navy rounded-2xl border-4 border-black shadow-2xl mt-2 md:mt-0 z-10 flex flex-col items-center p-2.5 sm:p-3.5 lg:p-4 ${isMobile ? '' : 'cursor-grab active:cursor-grabbing'}`}
              drag={!isMobile}
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              dragElastic={1}
              dragTransition={{ bounceStiffness: 80, bounceDamping: 6 }}
              whileHover={!isMobile ? { scale: 1.02 } : {}}
              whileDrag={!isMobile ? { scale: 1.05, rotate: 2 } : {}}
              transition={{ type: "spring", stiffness: 150, damping: 12, mass: 1.5 }}
              style={{ x: dragX, y: dragY, transformStyle: "preserve-3d", perspective: "1000px" }}
            >

              {/* SLRTCE Border Text */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden m-1 rounded-xl">
                <div className="absolute top-0.5 w-full text-center text-[7px] sm:text-[9px] text-white/25 tracking-[0.5em] font-black uppercase">SLRTCE • SLRTCE • SLRTCE</div>
                <div className="absolute bottom-0.5 w-full text-center text-[7px] sm:text-[9px] text-white/25 tracking-[0.5em] font-black uppercase">SLRTCE • SLRTCE • SLRTCE</div>
                <div className="absolute left-1 top-1/2 -translate-y-1/2 -rotate-90 text-[7px] sm:text-[9px] text-white/25 tracking-[0.5em] font-black uppercase origin-center whitespace-nowrap">SLRTCE • SLRTCE • SLRTCE</div>
                <div className="absolute right-1 top-1/2 -translate-y-1/2 rotate-90 text-[7px] sm:text-[9px] text-white/25 tracking-[0.5em] font-black uppercase origin-center whitespace-nowrap">SLRTCE • SLRTCE • SLRTCE</div>
              </div>

              {/* Lanyard Clip Hole / Attachment Point */}
              <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-12 sm:w-16 h-4 sm:h-5 bg-black rounded-full z-20 border-2 border-gray-700 shadow-md flex items-center justify-center">
                <div className="w-8 sm:w-10 h-1.5 sm:h-2 bg-gray-400 rounded-full" />
              </div>

              {/* Badge Inner Hole Cutout (Visual only) */}
              <div className="w-16 sm:w-20 h-2 sm:h-3 bg-[#F9E7B7] rounded-full border-2 border-black absolute top-2 sm:top-3 left-1/2 -translate-x-1/2 opacity-0" />

              {/* Badge Content */}
              <div className="w-full h-full bg-white rounded-xl mt-4 sm:mt-5 flex flex-col items-center p-3 sm:p-4 relative border-2 border-gray-200 shadow-md z-10 text-brand-navy">

                {/* Header inside badge */}
                <div className="w-full text-center pb-2 mb-2 border-b border-brand-navy/10">
                  <p className="text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.22em] text-brand-orange uppercase">
                    IEEE SLRTCE PRESENTS
                  </p>
                  <h3 className="text-xl sm:text-2xl font-black text-brand-navy uppercase tracking-wider leading-tight font-sans mt-0.5">
                    INSPIRE COLLOQUIUM 2026
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-brand-navy/70 font-medium tracking-wide italic mt-0.5">
                    Where Ideas Evolve into Innovation.
                  </p>
                </div>

                {/* Event Date with Calendar Icon */}
                <div className="flex items-center justify-center gap-1.5 text-brand-navy font-black text-xs sm:text-sm tracking-wider uppercase bg-brand-navy/5 py-1 px-3 rounded-md border border-brand-navy/10 w-full mb-2">
                  <Calendar className="w-4 h-4 text-orange-500 shrink-0" strokeWidth={2.5} />
                  <span>3rd OCTOBER 2026</span>
                </div>


                {/* Divider Line */}
                <div className="w-full h-px bg-brand-navy/10 mb-2" />

                {/* Feature Group 1 (Orange Icons) */}
                <div className="flex flex-col gap-1.5 w-full text-left">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-3.5 h-3.5 text-orange-500 shrink-0" strokeWidth={2.2} />
                    <span className="text-[10px] sm:text-[11px] text-brand-navy font-semibold leading-tight">
                      Research, Innovation &amp; Idea Exploration
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-orange-500 shrink-0" strokeWidth={2.2} />
                    <span className="text-[10px] sm:text-[11px] text-brand-navy font-semibold leading-tight">
                      Showcase Ideas, Prototypes &amp; Research Projects
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-3.5 h-3.5 text-orange-500 shrink-0" strokeWidth={2.2} />
                    <span className="text-[10px] sm:text-[11px] text-brand-navy font-semibold leading-tight">
                      Cash Prizes, Goodies &amp; Recognition
                    </span>
                  </div>
                </div>

                {/* Divider Line */}
                <div className="w-full h-px bg-brand-navy/10 my-2" />

                {/* Feature Group 2 (Navy Icons on white background) */}
                <div className="flex flex-col gap-1.5 w-full text-left mb-2.5">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-brand-navy shrink-0" strokeWidth={2.2} />
                    <span className="text-[10px] sm:text-[11px] text-brand-navy font-semibold leading-tight">
                      Open to UG Students, PG Students &amp; Researchers
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-brand-navy shrink-0" strokeWidth={2.2} />
                    <span className="text-[10px] sm:text-[11px] text-brand-navy font-semibold leading-tight">
                      Research Aligned with UNSDGs
                    </span>
                  </div>
                </div>

                {/* Timer Bar (Navbar Stamp Format) */}
                <div className="w-full drop-shadow-[0_2px_5px_rgba(0,0,0,0.18)] mb-2.5 select-none mx-auto rounded-lg overflow-hidden">
                  <div className="rounded-lg flex flex-col justify-center bg-[#F8E7BE] px-3 sm:px-4 py-1.5 sm:py-2 w-full border border-black/5 select-none relative">

                    {/* Top Header Row */}
                    <div className="flex justify-between items-center w-full mb-1 z-10 gap-2 px-1">
                      <div className={`text-[8px] sm:text-[9px] font-mono tracking-widest uppercase font-bold leading-none mt-px ${isExpired ? 'text-red-600' : 'text-black/80'}`}>
                        {isExpired ? '[ REGISTRATION CLOSED ]' : '[ REGISTRATION DEADLINE ]'}
                      </div>
                      {!isExpired && (
                        <div className="flex items-center gap-1.5 ml-auto">
                          <motion.div
                            animate={{ opacity: [1, 0.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-xs"
                          />
                          <span className="text-[8px] sm:text-[9px] font-mono text-red-600 tracking-widest font-bold leading-none mt-px">LIVE</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Countdown Row */}
                    <div className="flex items-center justify-center z-10 w-full gap-1.5 sm:gap-2 mt-0.5">
                      <div className="flex flex-col items-center flex-1">
                        <span className="font-mono font-bold text-lg sm:text-xl text-black leading-none tracking-widest">
                          {timeLeft.days.toString().padStart(2, '0')}
                        </span>
                        <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.1em] text-black/70 mt-0.5 uppercase leading-none">
                          DAYS
                        </span>
                      </div>
                      <span className={`text-black/40 font-mono font-bold text-base sm:text-lg mb-1 leading-none ${isExpired ? '' : 'animate-pulse'}`}>:</span>

                      <div className="flex flex-col items-center flex-1">
                        <span className="font-mono font-bold text-lg sm:text-xl text-black leading-none tracking-widest">
                          {timeLeft.hours.toString().padStart(2, '0')}
                        </span>
                        <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.1em] text-black/70 mt-0.5 uppercase leading-none">
                          HRS
                        </span>
                      </div>
                      <span className={`text-black/40 font-mono font-bold text-base sm:text-lg mb-1 leading-none ${isExpired ? '' : 'animate-pulse'}`}>:</span>

                      <div className="flex flex-col items-center flex-1">
                        <span className="font-mono font-bold text-lg sm:text-xl text-black leading-none tracking-widest">
                          {timeLeft.minutes.toString().padStart(2, '0')}
                        </span>
                        <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.1em] text-black/70 mt-0.5 uppercase leading-none">
                          MIN
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons: Register Now (Top) & Brochure (Below) */}
                <div className="flex flex-col gap-1.5 w-full mt-0.5">
                  <a
                    href="https://inspire-colloquium-registration-page.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-brand-navy hover:bg-brand-orange text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm flex items-center justify-center cursor-pointer pointer-events-auto active:scale-98"
                  >
                    Register Now →
                  </a>

                  <a
                    href="/brochure.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-1.5 bg-orange-400 hover:bg-orange-300 text-brand-navy text-xs font-extrabold uppercase tracking-wider rounded-lg transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer pointer-events-auto active:scale-98 border border-orange-400"
                  >
                    <svg className="w-3.5 h-3.5 text-brand-navy shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Brochure
                  </a>
                </div>

              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
