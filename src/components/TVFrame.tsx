import { ReactNode } from 'react';

interface TVFrameProps {
  children: ReactNode;
  className?: string;
}

export function TVFrame({ children, className = '' }: TVFrameProps) {
  return (
    <div className={`relative ${className}`}>
      {/* TV Antenna - top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full hidden md:block">
        <div className="mb-2 lg:mb-4">
          <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Left antenna rod */}
            <line x1="60" y1="75" x2="20" y2="5" stroke="#a8a29e" strokeWidth="3" strokeLinecap="round"/>
            <line x1="60" y1="75" x2="22" y2="7" stroke="#78716c" strokeWidth="1.5" strokeLinecap="round"/>
            
            {/* Right antenna rod */}
            <line x1="60" y1="75" x2="100" y2="5" stroke="#a8a29e" strokeWidth="3" strokeLinecap="round"/>
            <line x1="60" y1="75" x2="98" y2="7" stroke="#78716c" strokeWidth="1.5" strokeLinecap="round"/>
            
            {/* Center joint */}
            <circle cx="60" cy="75" r="5" fill="#57534e" stroke="#a8a29e" strokeWidth="2"/>
            <circle cx="60" cy="75" r="3" fill="#78716c"/>
            
            {/* Antenna tips */}
            <circle cx="20" cy="5" r="4" fill="#d6d3d1" stroke="#a8a29e" strokeWidth="1.5"/>
            <circle cx="100" cy="5" r="4" fill="#d6d3d1" stroke="#a8a29e" strokeWidth="1.5"/>
            
            {/* Antenna tips shine */}
            <circle cx="21" cy="4" r="1.5" fill="#f5f5f4" opacity="0.8"/>
            <circle cx="101" cy="4" r="1.5" fill="#f5f5f4" opacity="0.8"/>
          </svg>
        </div>
      </div>

      {/* Conference table - bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full hidden md:block">
        <div className="mt-6 lg:mt-10">
          <svg width="400" height="100" viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Table top - wood texture */}
            <ellipse cx="200" cy="30" rx="180" ry="25" fill="#92400e" opacity="0.3"/>
            <ellipse cx="200" cy="25" rx="180" ry="25" fill="#b45309" opacity="0.8"/>
            <ellipse cx="200" cy="22" rx="175" ry="23" fill="#d97706" opacity="0.6"/>
            
            {/* Wood grain lines */}
            <path d="M 40 22 Q 200 18 360 22" stroke="#92400e" strokeWidth="0.5" opacity="0.3" fill="none"/>
            <path d="M 50 25 Q 200 21 350 25" stroke="#92400e" strokeWidth="0.5" opacity="0.3" fill="none"/>
            <path d="M 45 28 Q 200 24 355 28" stroke="#92400e" strokeWidth="0.5" opacity="0.3" fill="none"/>
            
            {/* Office chair 1 - left */}
            <g transform="translate(80, 45)">
              <rect x="0" y="15" width="30" height="8" rx="4" fill="#44403c"/>
              <rect x="12" y="0" width="6" height="18" rx="2" fill="#57534e"/>
              <circle cx="15" cy="25" r="3" fill="#78716c"/>
            </g>
            
            {/* Office chair 2 - center left */}
            <g transform="translate(150, 50)">
              <rect x="0" y="15" width="30" height="8" rx="4" fill="#44403c"/>
              <rect x="12" y="0" width="6" height="18" rx="2" fill="#57534e"/>
              <circle cx="15" cy="25" r="3" fill="#78716c"/>
            </g>
            
            {/* Office chair 3 - center right */}
            <g transform="translate(220, 50)">
              <rect x="0" y="15" width="30" height="8" rx="4" fill="#44403c"/>
              <rect x="12" y="0" width="6" height="18" rx="2" fill="#57534e"/>
              <circle cx="15" cy="25" r="3" fill="#78716c"/>
            </g>
            
            {/* Office chair 4 - right */}
            <g transform="translate(290, 45)">
              <rect x="0" y="15" width="30" height="8" rx="4" fill="#44403c"/>
              <rect x="12" y="0" width="6" height="18" rx="2" fill="#57534e"/>
              <circle cx="15" cy="25" r="3" fill="#78716c"/>
            </g>
            
            {/* Papers on table */}
            <rect x="170" y="15" width="20" height="15" rx="1" fill="#fef3c7" opacity="0.9"/>
            <rect x="172" y="17" width="16" height="11" rx="0.5" fill="#fefce8"/>
            <line x1="174" y1="19" x2="186" y2="19" stroke="#78716c" strokeWidth="0.5" opacity="0.3"/>
            <line x1="174" y1="21" x2="186" y2="21" stroke="#78716c" strokeWidth="0.5" opacity="0.3"/>
            <line x1="174" y1="23" x2="186" y2="23" stroke="#78716c" strokeWidth="0.5" opacity="0.3"/>
            
            {/* Coffee mug on table */}
            <ellipse cx="220" cy="20" rx="6" ry="3" fill="#92400e" opacity="0.5"/>
            <rect x="214" y="12" width="12" height="12" rx="2" fill="#fef3c7" stroke="#d6c7a8" strokeWidth="0.5"/>
            <path d="M 226 16 Q 230 16 230 20 Q 230 24 226 24" stroke="#d6c7a8" strokeWidth="1" fill="none"/>
          </svg>
        </div>
      </div>

      {/* TV Body - Black */}
      <div className="bg-gradient-to-br from-black via-stone-950 to-black p-8 rounded-lg shadow-2xl border-4 border-black">
        {/* Screen - darker */}
        <div className="relative bg-black overflow-hidden shadow-inner border-2 border-stone-950">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
          {children}
        </div>
        
        {/* Control panel - Black style */}
        <div className="mt-4 flex justify-center gap-3">
          <div className="w-16 h-3 bg-stone-950 rounded border border-black" />
          <div className="w-3 h-3 bg-amber-600 rounded-full shadow-inner" />
        </div>
      </div>

      {/* Dunder Mifflin Badge */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
        <div className="bg-amber-50 px-4 py-1 rounded shadow-md border-2 border-stone-400">
          <p className="text-stone-700 text-xs font-semibold tracking-wide">DUNDER MIFFLIN</p>
          <p className="text-stone-500 text-[8px] text-center">PAPER COMPANY</p>
        </div>
      </div>
    </div>
  );
}
