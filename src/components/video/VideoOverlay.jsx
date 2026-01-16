import { Crosshair, Cpu, Thermometer, Droplets, Gauge, Navigation, Radio } from 'lucide-react';

export default function VideoOverlay({ currentReadings, videoTime }) {
    const depth = currentReadings?.depth?.toFixed(1) || '12.0';
    const temperature = currentReadings?.temperature?.toFixed(0) || '38';
    const humidity = currentReadings?.humidity?.toFixed(0) || '85';

    // Format video time as MM:SS
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="absolute inset-0 pointer-events-none z-20 p-5">
            {/* Top Left - Camera & AI Info */}
            <div className="absolute top-5 left-5">
                <div className="glass-card-alt p-3 space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00ff41] shadow-[0_0_6px_#00ff41]" />
                        <span className="text-[10px] text-[#00ff41] font-mono tracking-widest">VISION CORE ACTIVE</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] font-mono">
                        <div className="text-white/40">ISO</div>
                        <div className="text-white">800</div>
                        <div className="text-white/40">APERTURE</div>
                        <div className="text-white">f/2.8</div>
                        <div className="text-white/40">FPS</div>
                        <div className="text-white">30</div>
                        <div className="text-white/40">CODEC</div>
                        <div className="text-white">H.265</div>
                    </div>
                </div>
            </div>

            {/* Top Right - AI & Sensor Data */}
            <div className="absolute top-5 right-5">
                <div className="glass-card-alt p-3 space-y-3">
                    <div className="flex items-center justify-between gap-6">
                        <div className="flex items-center gap-2">
                            <Cpu className="w-3.5 h-3.5 text-[#00ff41]" />
                            <span className="text-[10px] text-white/40 font-mono uppercase">AI Model</span>
                        </div>
                        <span className="text-xs text-[#00ff41] font-mono font-medium">YOLOv8-Sewer</span>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Gauge className="w-3 h-3 text-white/30" />
                                <span className="text-[10px] text-white/40">DEPTH</span>
                            </div>
                            <span className="text-xs text-white font-mono">{depth}m</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Thermometer className="w-3 h-3 text-white/30" />
                                <span className="text-[10px] text-white/40">TEMP</span>
                            </div>
                            <span className="text-xs text-white font-mono">{temperature}°C</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Droplets className="w-3 h-3 text-white/30" />
                                <span className="text-[10px] text-white/40">HUMIDITY</span>
                            </div>
                            <span className="text-xs text-white font-mono">{humidity}%</span>
                        </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div className="flex items-center justify-between">
                        <span className="text-[10px] text-white/40">AI CONFIDENCE</span>
                        <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-[#00ff41] to-[#00ff41]/60 rounded-full" style={{ width: '98%' }} />
                            </div>
                            <span className="text-xs text-[#00ff41] font-mono font-medium">98%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Left - Position */}
            <div className="absolute bottom-16 left-5">
                <div className="glass-card-alt p-3 space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                        <Navigation className="w-3 h-3 text-[#00ff41]" />
                        <span className="text-[10px] text-white/40 uppercase tracking-wider">Position</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] font-mono">
                        <div className="text-white/40">LAT</div>
                        <div className="text-white">28.6139°N</div>
                        <div className="text-white/40">LON</div>
                        <div className="text-white">77.2090°E</div>
                        <div className="text-white/40">SECTOR</div>
                        <div className="text-[#00ff41]">D-7</div>
                    </div>
                </div>
            </div>

            {/* Bottom Center - Timestamp & Mode */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
                <div className="glass-card-alt px-5 py-2.5 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Radio className="w-3 h-3 text-[#00ff41]" />
                        <span className="text-[9px] text-white/40 uppercase tracking-wider">Mode</span>
                    </div>
                    <span className="text-xs text-[#00ff41] font-mono font-medium">AUTONOMOUS SCAN</span>
                    <div className="w-px h-4 bg-white/10" />
                    <span className="text-sm text-white font-mono tracking-widest">{formatTime(videoTime)}</span>
                </div>
            </div>

            {/* Bottom Right - Robot Status */}
            <div className="absolute bottom-16 right-5">
                <div className="glass-card-alt p-3 space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                        <Crosshair className="w-3 h-3 text-[#00ff41]" />
                        <span className="text-[10px] text-white/40 uppercase tracking-wider">Robot Status</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] font-mono">
                        <div className="text-white/40">SPEED</div>
                        <div className="text-white">0.3 m/s</div>
                        <div className="text-white/40">HEADING</div>
                        <div className="text-white">127°</div>
                        <div className="text-white/40">STATUS</div>
                        <div className="text-[#00ff41]">SCANNING</div>
                    </div>
                </div>
            </div>

            {/* Side Mode Indicators */}
            <div className="absolute top-1/2 left-5 -translate-y-1/2">
                <div className="flex flex-col gap-2">
                    {['SCAN', 'NAV', 'MAP', 'AI'].map((mode, i) => (
                        <div
                            key={mode}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-[8px] font-mono tracking-wider ${i === 0
                                    ? 'bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/30'
                                    : 'bg-white/5 text-white/30 border border-white/5'
                                }`}
                        >
                            {mode}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Side Distance Markers */}
            <div className="absolute top-1/2 right-5 -translate-y-1/2">
                <div className="flex flex-col items-end gap-3">
                    {[5, 10, 15, 20].map((dist) => (
                        <div key={dist} className="flex items-center gap-2">
                            <span className="text-[9px] text-white/30 font-mono">{dist}m</span>
                            <div className="w-3 h-px bg-white/20" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
