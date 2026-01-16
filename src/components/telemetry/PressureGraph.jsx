import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function PressureGraph({ data }) {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const value = payload[0].value;
            const isNormal = value >= 12 && value <= 16;
            return (
                <div className="bg-[#0a0a15]/95 backdrop-blur-xl border border-white/10 rounded-lg px-4 py-3 shadow-xl">
                    <div className="text-[10px] text-white/40 mb-1">{label}</div>
                    <div className="flex items-baseline gap-2">
                        <span className={`text-lg font-mono font-bold ${isNormal ? 'text-[#0088ff]' : 'text-[#ff9f00]'}`}>
                            {value.toFixed(2)}
                        </span>
                        <span className="text-xs text-white/40">PSI</span>
                    </div>
                    <div className="mt-1 text-[9px] text-[#00ff41] uppercase tracking-wider">
                        {isNormal ? '✓ Nominal Range' : '⚠ Check Pressure'}
                    </div>
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
                    <linearGradient id="pressureGradientEnhanced" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0088ff" stopOpacity={0.3} />
                        <stop offset="50%" stopColor="#0088ff" stopOpacity={0.1} />
                        <stop offset="100%" stopColor="#0088ff" stopOpacity={0} />
                    </linearGradient>
                    <filter id="glowBlue">
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
                    domain={[10, 18]}
                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 9 }}
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                    tickLine={false}
                    ticks={[10, 12, 14, 16, 18]}
                />

                <Tooltip content={<CustomTooltip />} />

                {/* Nominal range band */}
                <ReferenceLine
                    y={12}
                    stroke="#00ff41"
                    strokeDasharray="6 4"
                    strokeOpacity={0.3}
                />
                <ReferenceLine
                    y={16}
                    stroke="#00ff41"
                    strokeDasharray="6 4"
                    strokeOpacity={0.3}
                />

                {/* Optimal line */}
                <ReferenceLine
                    y={14}
                    stroke="#00ff41"
                    strokeDasharray="2 2"
                    strokeOpacity={0.4}
                    label={{
                        value: 'OPTIMAL',
                        position: 'right',
                        fill: '#00ff41',
                        fontSize: 8,
                        opacity: 0.6
                    }}
                />

                <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#0088ff"
                    strokeWidth={2}
                    fill="url(#pressureGradientEnhanced)"
                    dot={false}
                    filter="url(#glowBlue)"
                    activeDot={{
                        r: 5,
                        fill: '#0088ff',
                        stroke: '#0a0a0a',
                        strokeWidth: 2,
                    }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
