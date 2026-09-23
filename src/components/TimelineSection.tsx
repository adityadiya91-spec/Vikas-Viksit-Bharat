import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';

interface Stage {
  id: number;
  numeral: string;
  title: string;
  date: string;
  time?: string;
  venue?: string;
  note?: string;
  summary: string;
  positionClasses: string;
}

const stages: Stage[] = [
  {
    id: 1,
    numeral: '1',
    title: 'Registration & Submission',
    date: 'Deadline: 30th Sep 2026',
    venue: 'Official Colloquium Portal',
    summary:
      'Initial submission of a structured research or innovative idea, including its abstract, concept, and proposed methodology, aligned with any of the 9 tracks and relevant UN Sustainable Development Goals (SDGs).',
    positionClasses:
      'lg:top-[6.4vw] lg:left-[8%] xl:left-[11%] 2xl:left-[10%]',
  },
  {
    id: 2,
    numeral: '2',
    title: 'Submission Evaluation and Result',
    date: 'Deadline: 01 Oct 2026',
    venue: 'Official Colloquium Portal',
    summary:
      'Official declaration of PPT evaluation results and technical review scores. A total of 60 teams from UG/Diploma, 15 teams from PG, and 25 teams from PPG will be selected to advance to the on-campus defense.',
    positionClasses:
      'lg:top-[30.4vw] lg:left-[44%] xl:left-[46%] 2xl:left-[48%]',
  },
  {
    id: 3,
    numeral: '3',
    title: 'Payment Confirmation',
    date: 'Deadline: 02 Oct 2026',
    note: 'Payment Only for Selected Teams Only selected teams are required to pay the participation fee of ₹300.',
    venue: 'Online Payment via Our Official Payment Portal',
    summary:
      'Final registration fee submission and slot confirmation exclusively for shortlisted teams selected to participate in the on-campus competition.',
    positionClasses:
      'lg:top-[57.6vw] lg:left-[2%] xl:left-[5%] 2xl:left-[4%]',
  },
  {
    id: 4,
    numeral: '4',
    title: 'Internal Evaluation',
    date: '03rd Oct 2026',
    time: '9:00 AM – 5:00 PM',
    venue: 'SLRTCE Campus, Mira-Bhayandar',
    summary:
      'Shortlisted teams will present a focused 12-minute technical presentation before an expert academic review panel on campus.',
    positionClasses:
      'lg:top-[72vw] lg:left-[62%] xl:left-[64%] 2xl:left-[66%]',
  },
  {
    id: 5,
    numeral: '5',
    title: 'Grand Finale & Awards',
    date: '03rd Oct 2026',
    time: '2:00 PM – 5:30 PM',
    venue: 'Main Auditorium, SLRTCE Campus',
    summary:
      'Top finalist teams will deliver their final presentations before an invited panel of industry leaders, researchers, and academicians, followed by the valedictory ceremony and awards presentation.',
    positionClasses:
      'lg:top-[92.8vw] lg:left-[12%] xl:left-[16%] 2xl:left-[14%]',
  },
];

// Production SVG path starting at Stage 1 and terminating cleanly beside Stage 5 (red marked position)
const HACKSPIRE_DESKTOP_PATH =
  'M38 -145C38 -80 22 -20 9.001 4C9.001 4 -15.155 65.5 50.5 133.5C116.155 201.5 229.557 204.076 294.5 296.5C352.121 378.5 348.348 441.21 440.5 512C550.5 596.5 710.501 479.853 862.001 535C955 568.5 1010 720 1040 820C1080 955 1120 1100 1184.5 1180C1225 1250 1250 1320 1255 1395';

const TimelineSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopPathRef = useRef<SVGPathElement>(null);

  const [desktopMarker, setDesktopMarker] = useState<{ x: number; y: number }>({ x: 38, y: -145 });
  const [mobileMarkerY, setMobileMarkerY] = useState<number>(0);
  const [scrollFraction, setScrollFraction] = useState<number>(0);

  // Responsive scroll tracking calibrated to viewport progression
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 30%', 'end 85%'],
  });

  // Smooth responsive spring for real-time bidirectional tracking
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 28,
    restDelta: 0.001,
  });

  // Calculate waypoint marker positions along the SVG path
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    const clamped = Math.min(1, Math.max(0, latest));
    setScrollFraction(clamped);

    // Desktop marker calculation
    if (desktopPathRef.current) {
      try {
        const total = desktopPathRef.current.getTotalLength();
        if (total > 0) {
          const pt = desktopPathRef.current.getPointAtLength(clamped * total);
          setDesktopMarker({ x: pt.x, y: pt.y });
        }
      } catch { }
    }

    // Mobile vertical marker
    setMobileMarkerY(clamped * 940);
  });

  // Initial waypoint calculation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (desktopPathRef.current) {
        try {
          const pt = desktopPathRef.current.getPointAtLength(0);
          setDesktopMarker({ x: pt.x, y: pt.y });
        } catch { }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Bidirectional active milestone calculation: activates when scrolling down, reverses when scrolling up
  const isStageActive = (index: number) => {
    if (index === 0) return scrollFraction > 0.005; // Active inside schedule section, dims when scrolled above

    // Desktop: strictly track marker Y position along the curve
    if (desktopMarker && typeof desktopMarker.y === 'number') {
      const yThresholds = [0, 220, 480, 880, 1260];
      return desktopMarker.y >= yThresholds[index];
    }

    // Mobile vertical scroll progression
    const scrollThresholds = [0, 0.20, 0.40, 0.65, 0.85];
    return scrollFraction >= scrollThresholds[index];
  };

  return (
    <section
      ref={sectionRef}
      id="schedule"
      className="relative z-10 flex w-full flex-col items-center overflow-x-clip bg-cover bg-center bg-no-repeat border-b border-orange-900/15 text-brand-navy scroll-mt-[65px] px-5 pt-[10vh] pb-16 sm:px-[6vw] sm:pt-[14vh] sm:pb-24 lg:pb-36 xl:pb-40 bg-[#FAF6EE]"
      style={{
        backgroundImage: "url('/backgrounds/bg-lemon-yellow.jpg')",
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Tactile Fine Grain Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-50 z-0"
        style={{
          backgroundImage: "url('/backgrounds/noise-texture.svg')",
          backgroundRepeat: 'repeat',
        }}
      />
      {/* Subtle Vignette and Smooth Top Seam Blend for Depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/10 z-0" />
      <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none bg-gradient-to-b from-black/25 via-black/10 to-transparent z-0" />



      {/* Archival Typography Watermark: ORGANIZED BY IEEE SLRTCE STUDENT BRANCH */}
      <div className="absolute right-4 sm:right-8 lg:right-12 xl:right-16 top-6 sm:top-10 lg:top-12 select-none pointer-events-none z-0 text-right">
        <h3 className="text-4xl sm:text-5xl lg:text-[4.5rem] xl:text-[5.5rem] font-black font-serif uppercase tracking-tight leading-[0.88] select-none text-right">
          <span className="text-[#0A2A5E]/[0.06] block tracking-tighter">ORGANIZED BY</span>
          <span className="text-[#C26510]/[0.18] italic block font-serif my-1 tracking-tight">IEEE SLRTCE</span>
          <span className="text-[#0A2A5E]/[0.06] block tracking-tight text-xl sm:text-2xl lg:text-[2.6rem] xl:text-[3.2rem] mt-2">STUDENT BRANCH</span>
        </h3>
      </div>

      {/* Top Left Header Section (Restored exactly to original) */}
      <div className="w-full max-w-[82rem] mb-6 lg:mb-10 relative z-10 self-start text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#123B6D] tracking-tight font-sans">
            Key Dates
          </h2>
          <div className="w-20 h-1 bg-[#123B6D] rounded-full my-3" />
          <p className="text-sm sm:text-base text-black/85 font-sans leading-relaxed font-medium ">
            The colloquium will be conducted through progressive stages, providing a seamless selection process from registration & submission to evaluation results, payment confirmation, internal evaluation, external expert evaluation and Valedictory Ceremony.
          </p>
        </motion.div>
      </div>

      {/* Main Roadmap Container - Sized with ample bottom clearance so Stage 5 stays cleanly inside */}
      <div className="relative mt-[4vh] w-full max-w-[82rem] lg:mt-0 lg:h-[114vw] xl:h-[112vw] 2xl:h-[110vw]">

        {/* ========================================================================= */}
        {/* DESKTOP SVG SERPENTINE PATH                                               */}
        {/* ========================================================================= */}
        <div
          className="pointer-events-none absolute top-[14.4vw] left-[0%] right-[28%] hidden h-[140.8vw] lg:block"
          aria-hidden="true"
        >
          <svg
            viewBox="-40 -40 1320 2400"
            preserveAspectRatio="none"
            className="h-full w-full overflow-visible"
            fill="none"
          >
            {/* Inactive Dashed Base Path with increased thickness */}
            <path
              d={HACKSPIRE_DESKTOP_PATH}
              stroke="#264A9B"
              strokeOpacity="0.25"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray="16 20"
              fill="none"
            />

            {/* Active Solid Deep Royal/Navy Blue Path with increased thickness */}
            <motion.path
              ref={desktopPathRef}
              d={HACKSPIRE_DESKTOP_PATH}
              stroke="#264A9B"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
              style={{ pathLength: smoothProgress }}
            />

            {/* Initial Start Point Anchor Node: White inside with blue border */}
            <circle
              cx="38"
              cy="-145"
              r="8"
              fill="white"
              stroke="#264A9B"
              strokeWidth="4"
              style={{ filter: 'drop-shadow(0 0 8px rgba(38, 74, 155, 0.45))' }}
            />

            {/* Final Destination Terminal Node at Stage 5: White inside with blue border */}
            <circle
              cx="1255"
              cy="1395"
              r="8"
              fill="white"
              stroke="#264A9B"
              strokeWidth="4"
              style={{ filter: 'drop-shadow(0 0 8px rgba(38, 74, 155, 0.45))' }}
            />

            {/* Leading Bullseye Waypoint Marker */}
            {desktopMarker && (
              <g
                style={{ opacity: 1 }}
                transform={`translate(${desktopMarker.x}, ${desktopMarker.y})`}
              >
                <circle
                  r="12"
                  fill="white"
                  stroke="#264A9B"
                  strokeWidth="4"
                  style={{ filter: 'drop-shadow(0 0 12px rgba(38, 74, 155, 0.45))' }}
                />
                <circle r="4" fill="#264A9B" />
              </g>
            )}
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE VERTICAL TIMELINE LINE                                             */}
        {/* ========================================================================= */}
        <div
          className="pointer-events-none absolute top-2 bottom-2 left-[1.15rem] w-6 lg:hidden"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 1000"
            preserveAspectRatio="none"
            className="h-full w-full overflow-visible"
            fill="none"
          >
            <path
              d="M12 0 L12 940"
              stroke="#264A9B"
              strokeOpacity="0.25"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeDasharray="8 10"
              fill="none"
            />
            <motion.path
              d="M12 0 L12 940"
              stroke="#264A9B"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              style={{ pathLength: smoothProgress }}
            />
            <g
              style={{ opacity: 1 }}
              transform={`translate(12, ${mobileMarkerY})`}
            >
              <circle
                r="7"
                fill="white"
                stroke="#264A9B"
                strokeWidth="3.5"
                style={{ filter: 'drop-shadow(0 0 8px rgba(38, 74, 155, 0.45))' }}
              />
            </g>
          </svg>
        </div>

        {/* ========================================================================= */}
        {/* MILESTONES (Positioned Away from Line with Reduced Description Size)      */}
        {/* ========================================================================= */}
        <div className="relative z-20 mt-10 flex flex-col items-center gap-10 lg:mt-0 lg:block lg:h-full lg:gap-0">
          {stages.map((stage, idx) => {
            const active = isStageActive(idx);

            return (
              <div
                key={stage.id}
                className={`relative z-20 flex w-full max-w-[28rem] items-start pl-10 sm:max-w-[32rem] lg:absolute lg:max-w-[32rem] lg:pl-0 xl:max-w-[36rem] 2xl:max-w-[40rem] transition-all duration-700 ease-out ${stage.positionClasses
                  }`}
                style={{
                  opacity: active ? 1 : 0.35,
                  transform: active ? 'translate(0px, 0px)' : 'translate(0px, 24px)',
                }}
              >
                {/* Mobile Waypoint Dot Node: White inside with blue border */}
                <span
                  className="absolute top-5 left-0 z-10 flex h-6 w-6 -translate-x-0.5 items-center justify-center lg:hidden"
                  aria-hidden="true"
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full border-[3px] bg-white transition-all duration-300"
                    style={{
                      borderColor: active ? '#264A9B' : '#D4D4D4',
                      boxShadow: active ? '0 0 10px rgba(38, 74, 155, 0.45)' : 'none',
                    }}
                  />
                </span>

                {/* Numeral: Increased font size + expanded length-wise horizontally */}
                <div className="shrink-0 self-start pr-2.5 sm:pr-4">
                  <h3
                    className="font-sans text-[4.8rem] leading-[0.88] font-black sm:text-[6.2rem] md:text-[7.2rem] lg:text-[8rem] xl:text-[9.4rem] 2xl:text-[10.6rem] transition-colors duration-500 select-none inline-block origin-left transform scale-x-135 sm:scale-x-140"
                    style={{ color: active ? 'rgb(17, 17, 17)' : '#9E9E9E' }}
                  >
                    {stage.numeral}
                  </h3>
                </div>

                {/* Milestone Text Box */}
                <div className="flex flex-col px-2 pt-1.5 sm:px-4 lg:py-2 flex-1 min-w-0">
                  {/* Stage Title: Increased font size & navy color #123B6D */}
                  <h4
                    className={`pt-1 font-sans text-lg font-bold leading-tight sm:text-2xl sm:leading-tight lg:pt-0 lg:text-2xl xl:text-3xl 2xl:text-4xl transition-colors duration-500 ${active ? 'text-[#123B6D]' : 'text-[#123B6D]/45'
                      }`}
                  >
                    {stage.title}
                  </h4>

                  {/* Gradient Underline: Expanded length-wise */}
                  <div
                    className="mt-2 h-0.5 w-[min(75vw,20rem)] bg-gradient-to-r from-[#123B6D] via-[#264A9B] to-transparent sm:w-[min(60vw,24rem)] lg:w-[22rem] xl:w-[26rem] 2xl:w-[30rem]"
                    aria-hidden="true"
                  />

                  {/* Date, Timing & Badges: Increased font sizes */}
                  <div className="mt-2 flex flex-col gap-1.5 sm:gap-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <p className="font-secondary text-base font-bold tracking-wide text-black/85 sm:text-lg xl:text-xl">
                        {stage.date}
                      </p>

                      {stage.note && (
                        <span className="text-xs sm:text-sm font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                          {stage.note}
                        </span>
                      )}

                      {stage.time && (
                        <span className="text-xs sm:text-sm font-medium px-2.5 py-0.5 rounded-full bg-blue-50 text-[#123B6D] border border-[#264A9B]/30">
                          {stage.time}
                        </span>
                      )}
                    </div>

                    {stage.venue && (
                      <div className="text-xs sm:text-sm font-medium text-[#0A2A5E]/80 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 shrink-0 opacity-75" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>{stage.venue}</span>
                      </div>
                    )}

                    {/* Description Paragraph: Increased font size and expanded length-wise */}
                    <p className="font-sans text-sm sm:text-base lg:text-base xl:text-[1.05rem] text-black/75 font-normal leading-relaxed max-w-[340px] sm:max-w-[420px] lg:max-w-[380px] xl:max-w-[450px] 2xl:max-w-[500px]">
                      {stage.summary}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TimelineSection;
