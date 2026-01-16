import { AlertTriangle, Target, Scan } from 'lucide-react';

export default function DetectionBox({ detection }) {
    const { type, label, sublabel, confidence, severity, position } = detection;

    const isCritical = type === 'crack' || type === 'blockage';
    const borderColor = isCritical ? '#ff3333' : '#ff9f00';
    const bgColor = isCritical ? 'rgba(255, 51, 51, 0.08)' : 'rgba(255, 159, 0, 0.08)';

    return (
        <div
            className="absolute z-30 detection-box"
            style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                width: `${position.width}%`,
                height: `${position.height}%`,
                border: `2px solid ${borderColor}`,
                background: bgColor,
                borderRadius: '4px',
            }}
        >
            {/* Animated Corner Accents */}
            {[
                { pos: 'top-0 left-0', border: 'border-t-2 border-l-2', translate: '-translate-x-px -translate-y-px' },
                { pos: 'top-0 right-0', border: 'border-t-2 border-r-2', translate: 'translate-x-px -translate-y-px' },
                { pos: 'bottom-0 left-0', border: 'border-b-2 border-l-2', translate: '-translate-x-px translate-y-px' },
                { pos: 'bottom-0 right-0', border: 'border-b-2 border-r-2', translate: 'translate-x-px translate-y-px' },
            ].map((corner, i) => (
                <div
                    key={i}
                    className={`absolute ${corner.pos} ${corner.translate} w-4 h-4 ${corner.border}`}
                    style={{ borderColor }}
                />
            ))}

            {/* Top Label Card */}
            <div
                className="absolute -top-12 left-0 flex items-stretch gap-0 rounded-lg overflow-hidden"
                style={{
                    background: 'rgba(10, 10, 15, 0.95)',
                    border: `1px solid ${borderColor}40`,
                    backdropFilter: 'blur(10px)',
                }}
            >
                {/* Icon Section */}
                <div
                    className="flex items-center justify-center px-2.5"
                    style={{ background: `${borderColor}20` }}
                >
                    {isCritical ? (
                        <AlertTriangle className="w-4 h-4 animate-pulse" style={{ color: borderColor }} />
                    ) : (
                        <Target className="w-4 h-4" style={{ color: borderColor }} />
                    )}
                </div>

                {/* Text Section */}
                <div className="px-3 py-1.5">
                    <div
                        className="text-[10px] font-bold tracking-widest uppercase"
                        style={{ color: borderColor }}
                    >
                        {label}
                    </div>
                    <div className="text-[9px] text-white/40 tracking-wide">
                        {sublabel}
                    </div>
                </div>
            </div>

            {/* Bottom Info Bar */}
            <div
                className="absolute -bottom-8 left-0 right-0 flex items-center justify-between px-2 py-1 rounded"
                style={{
                    background: 'rgba(10, 10, 15, 0.9)',
                    border: `1px solid ${borderColor}30`,
                }}
            >
                <div className="flex items-center gap-1.5">
                    <Scan className="w-3 h-3" style={{ color: borderColor }} />
                    <span className="text-[9px] font-mono" style={{ color: borderColor }}>
                        CONF: {confidence}%
                    </span>
                </div>
                <div
                    className="px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider"
                    style={{
                        background: `${borderColor}20`,
                        color: borderColor,
                    }}
                >
                    {severity}
                </div>
            </div>

            {/* Inner Scanning Line */}
            <div className="absolute inset-0 overflow-hidden rounded">
                <div
                    className="absolute left-0 right-0 h-[2px]"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${borderColor}, transparent)`,
                        animation: 'detection-scan 1.5s ease-in-out infinite',
                        opacity: 0.6,
                    }}
                />
            </div>

            {/* Glow Effect */}
            <div
                className="absolute inset-0 rounded pointer-events-none"
                style={{
                    boxShadow: `inset 0 0 40px ${borderColor}15, 0 0 30px ${borderColor}20`,
                }}
            />

            <style>{`
        @keyframes detection-scan {
          0%, 100% { top: 0; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { top: calc(100% - 2px); opacity: 0; }
        }
      `}</style>
        </div>
    );
}
