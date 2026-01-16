import MethaneGraph from './MethaneGraph';
import PressureGraph from './PressureGraph';
import { Activity, Gauge, Battery, Thermometer, TrendingUp, AlertTriangle } from 'lucide-react';

export default function TelemetryPanel({ methaneData, pressureData, currentReadings }) {
    const methane = currentReadings?.methane?.toFixed(1) || '20.0';
    const pressure = currentReadings?.pressure?.toFixed(2) || '14.00';
    const battery = currentReadings?.batteryLevel?.toFixed(0) || '87';

    const methaneLevel = parseFloat(methane);
    const isMethaneWarning = methaneLevel > 35;
    const isMethaneAlert = methaneLevel > 50;

    return (
        <div className="h-full flex flex-col gap-4">
            {/* Quick Stats Row */}
            <div className="grid grid-cols-3 gap-3">
                <QuickStat
                    icon={Activity}
                    label="Methane"
                    unit="PPM"
                    value={methane}
                    status={isMethaneAlert ? 'danger' : isMethaneWarning ? 'warning' : 'normal'}
                    trend={methaneLevel > 25 ? 'up' : 'stable'}
                />
                <QuickStat
                    icon={Gauge}
                    label="Pressure"
                    unit="PSI"
                    value={pressure}
                    status="normal"
                    trend="stable"
                />
                <QuickStat
                    icon={Battery}
                    label="Battery"
                    unit="%"
                    value={battery}
                    status={parseFloat(battery) < 20 ? 'warning' : 'normal'}
                    trend="stable"
                />
            </div>

            {/* Methane Graph */}
            <div className="flex-1 min-h-0">
                <div className="h-full glass-card p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${isMethaneWarning ? 'bg-[#ff9f00]/10' : 'bg-[#00ff41]/10'}`}>
                                <Activity className={`w-4 h-4 ${isMethaneWarning ? 'text-[#ff9f00]' : 'text-[#00ff41]'}`} />
                            </div>
                            <div>
                                <span className="text-sm text-white font-medium">Methane Levels (CH4)</span>
                                <div className="text-[10px] text-white/40 mt-0.5">Real-time gas concentration</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
                                <AlertTriangle className="w-3 h-3 text-[#ff9f00]" />
                                <span className="text-[10px] text-white/50">Threshold:</span>
                                <span className="text-[10px] text-[#ff9f00] font-mono font-medium">35 PPM</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-[calc(100%-56px)]">
                        <MethaneGraph data={methaneData} />
                    </div>
                </div>
            </div>

            {/* Pressure Graph */}
            <div className="flex-1 min-h-0">
                <div className="h-full glass-card p-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-[#0088ff]/10">
                                <Gauge className="w-4 h-4 text-[#0088ff]" />
                            </div>
                            <div>
                                <span className="text-sm text-white font-medium">Internal Pressure (PSI)</span>
                                <div className="text-[10px] text-white/40 mt-0.5">Robot hull integrity monitor</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
                            <div className="w-2 h-2 rounded-full bg-[#00ff41]" />
                            <span className="text-[10px] text-white/50">Nominal:</span>
                            <span className="text-[10px] text-[#00ff41] font-mono font-medium">12-16 PSI</span>
                        </div>
                    </div>
                    <div className="h-[calc(100%-56px)]">
                        <PressureGraph data={pressureData} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function QuickStat({ icon: Icon, label, unit, value, status, trend }) {
    const statusStyles = {
        normal: {
            bg: 'from-[#00ff41]/10 to-[#00ff41]/5',
            border: 'border-[#00ff41]/20',
            text: 'text-[#00ff41]',
            glow: 'shadow-[0_0_20px_rgba(0,255,65,0.1)]'
        },
        warning: {
            bg: 'from-[#ff9f00]/10 to-[#ff9f00]/5',
            border: 'border-[#ff9f00]/30',
            text: 'text-[#ff9f00]',
            glow: 'shadow-[0_0_20px_rgba(255,159,0,0.15)]'
        },
        danger: {
            bg: 'from-[#ff3333]/10 to-[#ff3333]/5',
            border: 'border-[#ff3333]/30',
            text: 'text-[#ff3333]',
            glow: 'shadow-[0_0_20px_rgba(255,51,51,0.2)]'
        },
    };

    const colors = statusStyles[status] || statusStyles.normal;

    return (
        <div className={`relative p-4 rounded-xl bg-gradient-to-br ${colors.bg} border ${colors.border} ${colors.glow} transition-all duration-300 overflow-hidden`}>
            {/* Top accent line */}
            <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${colors.text.replace('text-', 'via-')} to-transparent opacity-50`} />

            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Icon className={`w-3.5 h-3.5 ${colors.text}`} />
                    <span className="text-[10px] text-white/40 uppercase tracking-wider">{label}</span>
                </div>
                {trend === 'up' && (
                    <TrendingUp className={`w-3 h-3 ${colors.text} animate-pulse`} />
                )}
            </div>

            <div className="flex items-baseline gap-1">
                <span className={`text-2xl font-mono font-bold ${colors.text}`}>{value}</span>
                <span className="text-xs text-white/30 font-mono">{unit}</span>
            </div>
        </div>
    );
}
