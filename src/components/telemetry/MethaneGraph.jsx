import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function MethaneGraph({ data }) {
    const hasWarning = data.some(d => d.value > 35);
    const hasAlert = data.some(d => d.value > 50);
    const currentColor = hasAlert ? '#ff3333' : hasWarning ? '#ff9f00' : '#00ff41';

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const value = payload[0].value;
            const isHigh = value > 35;
            return (
                <div className="bg-[#0a0a15]/95 backdrop-blur-xl border border-white/10 rounded-lg px-4 py-3 shadow-xl">
                    <div className="text-[10px] text-white/40 mb-1">{label}</div>
                    <div className="flex items-baseline gap-2">
                        <span className={`text-lg font-mono font-bold ${isHigh ? 'text-[#ff9f00]' : 'text-[#00ff41]'}`}>
                            {value.toFixed(1)}
                        </span>
                        <span className="text-xs text-white/40">PPM</span>
                    </div>
                    {isHigh && (
                        <div className="mt-1 text-[9px] text-[#ff9f00] uppercase tracking-wider">⚠ Above Threshold</div>
                    )}
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={data}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="methaneGradientEnhanced" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={currentColor} stopOpacity={0.3} />
                        <stop offset="50%" stopColor={currentColor} stopOpacity={0.1} />
                        <stop offset="100%" stopColor={currentColor} stopOpacity={0} />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.04)"
                    horizontal={true}
                    vertical={false}
                />

                <XAxis
                    dataKey="time"
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9 }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                    tickLine={false}
                    interval="preserveStartEnd"
                    minTickGap={50}
                />

                <YAxis
                    domain={[0, 70]}
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9 }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                    tickLine={false}
                    ticks={[0, 20, 35, 50, 70]}
                />

                <Tooltip content={<CustomTooltip />} />

                <ReferenceLine
                    y={35}
                    stroke="#ff9f00"
                    strokeDasharray="6 4"
                    strokeOpacity={0.6}
                    label={{
                        value: 'WARNING',
                        position: 'right',
                        fill: '#ff9f00',
                        fontSize: 8,
                        opacity: 0.7
                    }}
                />

                <ReferenceLine
                    y={50}
                    stroke="#ff3333"
                    strokeDasharray="4 4"
                    strokeOpacity={0.5}
                    label={{
                        value: 'CRITICAL',
                        position: 'right',
                        fill: '#ff3333',
                        fontSize: 8,
                        opacity: 0.7
                    }}
                />

                <Area
                    type="monotone"
                    dataKey="value"
                    stroke={currentColor}
                    strokeWidth={2}
                    fill="url(#methaneGradientEnhanced)"
                    dot={false}
                    filter="url(#glow)"
                    activeDot={{
                        r: 5,
                        fill: currentColor,
                        stroke: '#0a0a0a',
                        strokeWidth: 2,
                        filter: 'url(#glow)'
                    }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
