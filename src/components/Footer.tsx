import React from 'react';
import { Mail, MapPin } from 'lucide-react';

interface FooterProps {
  children?: React.ReactNode;
}

const Footer = ({ children }: FooterProps) => {
  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ═══════════════════════════════════════════════════════════
  // Realistic Hand-Torn Paper Deckle Edge — EXACT COMPLEMENTARY PIECE TO NAVBAR
  // Derived directly from Navbar's torn contour with translucent navy blue film
  // ═══════════════════════════════════════════════════════════
  const TornDeckleEdge = () => (
    <svg
      viewBox="0 0 1440 45"
      preserveAspectRatio="none"
      className="w-full h-3.5 sm:h-4.5 md:h-5 block"
      style={{
        filter: 'drop-shadow(0 -2px 3px rgba(0, 0, 0, 0.35)) drop-shadow(0 -1px 1px rgba(0, 0, 0, 0.2))',
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
    >
      <defs>
        {/* Cellulose pulp displacement filter */}
        <filter id="footer-torn-roughness" x="-2%" y="-15%" width="104%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency="0.14 0.22" numOctaves={5} seed={83} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={3.2} xChannelSelector="R" yChannelSelector="G" result="displaced" />
        </filter>
      </defs>

      {/* Layer 1: Exposed Unbleached Paper Core Deckle Fringe — complementary raw paper pulp */}
      <path
        d="M 0,35 L 0,14 L 20,16.5 L 32,14.5 L 44,13 L 56,15.5 L 68,13.5 L 80,17 L 92,14.5 L 104,12.5 L 116,15 L 128,13.5 L 140,15.5 L 152,20.5 L 164,25 L 176,20.5 L 184,24 L 196,20 L 208,16.5 L 220,13.5 L 232,11.5 L 244,12.5 L 256,15.5 L 268,19.5 L 280,26 L 292,22 L 300,25 L 312,22 L 324,17 L 336,14.5 L 348,12.5 L 360,14 L 372,15.5 L 384,19.5 L 396,22 L 408,18 L 420,14.5 L 432,13 L 444,13.5 L 456,16.5 L 468,20.5 L 480,25.5 L 492,30 L 504,25 L 512,28 L 524,24.5 L 536,19.5 L 548,16 L 560,13.5 L 572,14.5 L 584,18.5 L 596,21 L 608,17.5 L 620,19.5 L 632,16.5 L 644,13.5 L 656,12 L 668,14.5 L 680,12.5 L 692,13.5 L 704,16.5 L 716,20.5 L 728,26.5 L 740,22.5 L 748,25 L 760,22 L 772,17.5 L 784,13.5 L 796,15 L 808,12.5 L 820,10.5 L 832,12 L 844,15.5 L 856,13.5 L 868,15 L 880,12.5 L 892,13.5 L 904,16.5 L 916,20.5 L 928,25.5 L 938,29.5 L 950,24.5 L 958,27.5 L 970,22.5 L 982,18 L 995,15 L 1008,12.5 L 1020,13.5 L 1032,15.5 L 1045,20.5 L 1058,17.5 L 1070,13.5 L 1082,15.5 L 1095,13 L 1108,14.5 L 1120,16.5 L 1132,21.5 L 1140,24 L 1152,20.5 L 1165,23.5 L 1178,19.5 L 1190,14.5 L 1202,12.5 L 1215,16.5 L 1228,14 L 1240,15.5 L 1252,21.5 L 1264,27 L 1275,23.5 L 1282,26 L 1295,22.5 L 1308,17 L 1320,13.5 L 1334,14.5 L 1345,19.5 L 1358,21 L 1370,17 L 1386,14.5 L 1395,17.5 L 1410,14 L 1422,16 L 1440,13.5 L 1440,35 Z"
        fill="#F8E7BE"
        opacity={0.95}
        filter="url(#footer-torn-roughness)"
      />

      {/* Layer 2: Translucent Navy Blue Sheet matching footer body */}
      <path
        d="M 0,45 L 0,16.5 L 20,19 L 32,17 L 44,15.5 L 56,18 L 68,16 L 80,19.5 L 92,17 L 104,15 L 116,17.5 L 128,16 L 140,18 L 152,23 L 164,27.5 L 176,23 L 184,26.5 L 196,22.5 L 208,19 L 220,16 L 232,14 L 244,15 L 256,18 L 268,22 L 280,28.5 L 292,24.5 L 300,27.5 L 312,24.5 L 324,19.5 L 336,17 L 348,15 L 360,16.5 L 372,18 L 384,22 L 396,24.5 L 408,20.5 L 420,17 L 432,15.5 L 444,16 L 456,19 L 468,23 L 480,28 L 492,32.5 L 504,27.5 L 512,30.5 L 524,27 L 536,22 L 548,18.5 L 560,16 L 572,17 L 584,21 L 596,23.5 L 608,20 L 620,22 L 632,19 L 644,16 L 656,14.5 L 668,17 L 680,15 L 692,16 L 704,19 L 716,23 L 728,29 L 740,25 L 748,27.5 L 760,24.5 L 772,20 L 784,16 L 796,17.5 L 808,15 L 820,13 L 832,14.5 L 844,18 L 856,16 L 868,17.5 L 880,15 L 892,16 L 904,19 L 916,23 L 928,28 L 938,32 L 950,27 L 958,30 L 970,25 L 982,20.5 L 995,17.5 L 1008,15 L 1020,16 L 1032,18 L 1045,23 L 1058,20 L 1070,16 L 1082,18 L 1095,15.5 L 1108,17 L 1120,19 L 1132,24 L 1140,26.5 L 1152,23 L 1165,26 L 1178,22 L 1190,17 L 1202,15 L 1215,19 L 1228,16.5 L 1240,18 L 1252,24 L 1264,29.5 L 1275,26 L 1282,28.5 L 1295,25 L 1308,19.5 L 1320,16 L 1334,17 L 1345,22 L 1358,23.5 L 1370,19.5 L 1386,17 L 1395,20 L 1410,16.5 L 1422,18.5 L 1440,16 L 1440,45 Z"
        fill="rgba(10, 42, 94, 0.45)"
        filter="url(#footer-torn-roughness)"
      />

      {/* Layer 3: Paper Edge Bevel */}
      <path
        d="M 0,16.5 L 20,19 L 32,17 L 44,15.5 L 56,18 L 68,16 L 80,19.5 L 92,17 L 104,15 L 116,17.5 L 128,16 L 140,18 L 152,23 L 164,27.5 L 176,23 L 184,26.5 L 196,22.5 L 208,19 L 220,16 L 232,14 L 244,15 L 256,18 L 268,22 L 280,28.5 L 292,24.5 L 300,27.5 L 312,24.5 L 324,19.5 L 336,17 L 348,15 L 360,16.5 L 372,18 L 384,22 L 396,24.5 L 408,20.5 L 420,17 L 432,15.5 L 444,16 L 456,19 L 468,23 L 480,28 L 492,32.5 L 504,27.5 L 512,30.5 L 524,27 L 536,22 L 548,18.5 L 560,16 L 572,17 L 584,21 L 596,23.5 L 608,20 L 620,22 L 632,19 L 644,16 L 656,14.5 L 668,17 L 680,15 L 692,16 L 704,19 L 716,23 L 728,29 L 740,25 L 748,27.5 L 760,24.5 L 772,20 L 784,16 L 796,17.5 L 808,15 L 820,13 L 832,14.5 L 844,18 L 856,16 L 868,17.5 L 880,15 L 892,16 L 904,19 L 916,23 L 928,28 L 938,32 L 950,27 L 958,30 L 970,25 L 982,20.5 L 995,17.5 L 1008,15 L 1020,16 L 1032,18 L 1045,23 L 1058,20 L 1070,16 L 1082,18 L 1095,15.5 L 1108,17 L 1120,19 L 1132,24 L 1140,26.5 L 1152,23 L 1165,26 L 1178,22 L 1190,17 L 1202,15 L 1215,19 L 1228,16.5 L 1240,18 L 1252,24 L 1264,29.5 L 1275,26 L 1282,28.5 L 1295,25 L 1308,19.5 L 1320,16 L 1334,17 L 1345,22 L 1358,23.5 L 1370,19.5 L 1386,17 L 1395,20 L 1410,16.5 L 1422,18.5 L 1440,16"
        stroke="rgba(6, 27, 59, 0.85)"
        strokeWidth={0.65}
        fill="none"
        filter="url(#footer-torn-roughness)"
      />

      {/* Layer 4: Exposed Pure White Cotton Cellulose Fibers */}
      <path
        d="M 1358,23.5 L 1345,25 M 1295,25 L 1282,30 M 1264,29.5 L 1252,25 M 1178,22 L 1165,27 M 970,25 L 958,31.5 M 938,32 L 928,29 M 760,24.5 L 748,28.5 M 728,29 L 716,24 M 536,22 L 524,28.5 M 512,30.5 L 492,33.5 M 396,24.5 L 384,23 M 312,24.5 L 300,29 M 196,22.5 L 184,28 M 164,27.5 L 152,24"
        stroke="rgba(255, 255, 255, 0.75)"
        strokeWidth={0.8}
        fill="none"
        filter="url(#footer-torn-roughness)"
      />

      {/* Layer 5: Paper Surface Light Highlights along Fractured Ridges */}
      <path
        d="M 1440,16 L 1410,16.5 M 1370,19.5 L 1358,23.5 M 1240,18 L 1202,15 M 1120,19 L 1070,16 M 904,19 L 880,15 M 844,18 L 820,13 M 704,19 L 656,14.5 M 584,21 L 560,16 M 444,16 L 420,17 M 256,18 L 232,14 M 128,16 L 92,17"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth={0.75}
        fill="none"
        filter="url(#footer-torn-roughness)"
      />
    </svg>
  );

  return (
    <footer 
      id="contact" 
      className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-cover bg-center border-t border-amber-950/40 text-white"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(20, 15, 10, 0.35), rgba(5, 5, 5, 0.65)), url('/cta-college-bg.jpg')",
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Tactile Fine Grain Texture Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60 z-0"
        style={{
          backgroundImage: "url('/backgrounds/noise-texture.svg')",
          backgroundRepeat: 'repeat',
        }}
      />
      {/* Subtle Vignette for Depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/25 via-transparent to-black/35 z-0" />

      {/* Content Layer: CTASection centered in available space */}
      <div className="relative w-full z-10 flex-1 flex flex-col justify-center">
        {children}
      </div>

      {/* Footer Area Docked at Bottom */}
      <div className="relative w-full z-20">
        {/* Torn Paper Deckle Edge transition */}
        <div className="relative w-full overflow-hidden pointer-events-none">
          <TornDeckleEdge />
        </div>

        {/* Translucent Blue Footer Body — Compact & Full-Width */}
        <div 
          className="w-full -mt-1 sm:-mt-1.5 pt-2 sm:pt-2.5 pb-2.5 sm:pb-3 text-white backdrop-blur-[4px]"
          style={{
            backgroundColor: 'rgba(10, 42, 94, 0.45)',
          }}
        >
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12">
            
            {/* Top Row: Contact & Address (Compact & Balanced) */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 text-left">
              
              {/* Left: Contact */}
              <div className="flex flex-col items-start max-w-md">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-amber-300 font-bold flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-amber-400" />
                  Contact
                </span>
                <p className="text-xs sm:text-[13px] font-semibold text-white/95 leading-tight">
                  IEEE SLRTCE Student Branch
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-[11px] sm:text-xs text-amber-100/85 mt-0.5">
                  <a href="mailto:colloquium.ieee@slrtce.in" className="hover:text-amber-300 transition-colors flex items-center gap-1.5 leading-tight">
                    <Mail className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                    <span>colloquium.ieee@slrtce.in</span>
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-[11px] sm:text-xs text-amber-100/85 mt-0.5">
                  <a href="mailto:ieee@slrtce.in" className="hover:text-amber-300 transition-colors flex items-center gap-1.5 leading-tight">
                    <Mail className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                    <span>ieee@slrtce.in</span>
                  </a>
                </div>
              </div>

              {/* Right: Address */}
              <div className="flex flex-col items-start sm:items-end sm:text-right max-w-md">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-amber-300 font-bold flex items-center gap-1.5 sm:flex-row-reverse">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  Address
                </span>
                <p className="text-[11px] sm:text-xs text-amber-100/90 leading-snug">
                  Shree L. R. Tiwari Educational Campus,<br />
                  Mira Road-East, THANE-401107
                </p>
              </div>

            </div>

            {/* Bottom Bar: Logos, IEEE Copyright Line, Socials, and Top button */}
            <div className="mt-2 pt-2 border-t border-white/15 flex flex-col md:flex-row justify-between items-center gap-2 sm:gap-3">
              {/* Left: Branding Logos */}
              <div className="flex items-center space-x-2">
                <img src="/slrtce-logo.png" alt="SLRTCE Logo" className="h-6 sm:h-7 w-auto object-contain" />
                <div className="h-4 sm:h-5 w-px bg-white/30" />
                <img src="/ieee-custom-logo-white.png" alt="IEEE SLRTCE Student Branch Logo" className="h-6 sm:h-7 w-auto object-contain mix-blend-screen" />
              </div>

              {/* Middle: IEEE Copyright Line */}
              <div className="text-center text-[9px] sm:text-[11px] text-white/75">
                <p>&copy; INSPIRE 2026 — IEEE SLRTCE STUDENT BRANCH.</p>
              </div>

              {/* Right: Social Icons & Top Button */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="flex gap-1.5">
                  {[
                    { label: 'LinkedIn', icon: 'in', href: 'https://www.linkedin.com/company/ieee-slrtce-student-branch/' },
                    { label: 'Instagram', icon: 'ig', href: 'https://www.instagram.com/ieee.slrtce' },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.label}
                      className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-white/10 hover:bg-[#FF6B00] hover:text-white rounded-full cursor-pointer transition-all text-white font-bold text-[9px]"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                <a
                  href="#home"
                  onClick={handleScrollToTop}
                  className="text-[9px] font-bold text-white bg-[#FF6B00] hover:bg-[#E65A00] transition-all px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-sm hover:shadow active:scale-95 cursor-pointer"
                >
                  Top ↑
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
