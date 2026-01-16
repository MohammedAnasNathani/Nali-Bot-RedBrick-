import { Wifi, Battery, Signal, Bell, MapPin, Clock } from 'lucide-react';
import { useClock } from '../../hooks/useClock';

export default function Header({ currentReadings }) {
    const { formattedTime, formattedDate } = useClock();
    const batteryLevel = Math.floor(currentReadings?.batteryLevel || 87);

    return (
        <header className="h-16 bg-gradient-to-r from-[#0a0a12] via-[#0d0d18] to-[#0a0a12] border-b border-white/5 flex items-center justify-between px-6">
            {/* Left: Title and Session */}
            <div className="flex items-center gap-6">
                <div>
                    <div className="flex items-baseline gap-3">
                        <h1 className="text-lg font-bold tracking-wider text-white">
                            NALI-BOT CONTROL CORE
                        </h1>
                        <span className="text-[10px] text-white/30 font-mono tracking-wider">v1.0.0</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#00ff41]/60" />
                        <span className="text-[10px] text-white/40 font-mono">SECTOR D-7 | DELHI MUNICIPAL</span>
                    </div>
                </div>

                <div className="h-8 w-px bg-white/10" />

                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5">
                    <span className="text-[10px] text-white/40 uppercase tracking-wider">Session</span>
                    <span className="text-xs text-[#00ff41] font-mono font-medium">NB-2024-0842</span>
                </div>
            </div>

            {/* Center: Connection Status */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#00ff41]/5 border border-[#00ff41]/20 shadow-[0_0_20px_rgba(0,255,65,0.1)]">
                    <div className="relative">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#00ff41] shadow-[0_0_12px_#00ff41]" />
                        <div className="absolute inset-0 rounded-full bg-[#00ff41] animate-ping opacity-50" />
                    </div>
                    <span className="text-xs text-[#00ff41] font-semibold tracking-widest uppercase">Connected</span>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5">
                    <Signal className="w-3.5 h-3.5 text-[#00ff41]" />
                    <span className="text-xs text-white/60 font-mono">-42dB</span>
                    <div className="flex gap-0.5 ml-1">
                        <div className="w-1 h-2 bg-[#00ff41] rounded-sm" />
                        <div className="w-1 h-3 bg-[#00ff41] rounded-sm" />
                        <div className="w-1 h-4 bg-[#00ff41] rounded-sm" />
                        <div className="w-1 h-3 bg-white/20 rounded-sm" />
                    </div>
                </div>
            </div>

            {/* Right: Battery, Notifications, Time */}
            <div className="flex items-center gap-5">
                {/* Battery */}
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Battery className={`w-5 h-5 ${batteryLevel > 20 ? 'text-[#00ff41]' : 'text-[#ff9f00]'}`} />
                        <div
                            className="absolute bottom-[5px] left-[4px] h-[8px] rounded-sm bg-current transition-all duration-500"
                            style={{ width: `${Math.min(12, (batteryLevel / 100) * 12)}px` }}
                        />
                    </div>
                    <span className="text-xs text-white/60 font-mono">{batteryLevel}%</span>
                </div>

                {/* Notifications */}
                <button className="relative p-2.5 rounded-xl hover:bg-white/5 transition-all duration-200 group">
                    <Bell className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors" />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#ff9f00] shadow-[0_0_8px_#ff9f00] animate-pulse" />
                </button>

                {/* Divider */}
                <div className="h-8 w-px bg-white/10" />

                {/* Time Display */}
                <div className="text-right min-w-[100px]">
                    <div className="flex items-center gap-2 justify-end">
                        <Clock className="w-4 h-4 text-[#00ff41]/60" />
                        <span className="text-xl font-mono text-white font-medium tracking-wider">{formattedTime}</span>
                    </div>
                    <div className="text-[10px] text-white/30 tracking-wider mt-0.5">{formattedDate.toUpperCase()}</div>
                </div>
            </div>
        </header>
    );
}
