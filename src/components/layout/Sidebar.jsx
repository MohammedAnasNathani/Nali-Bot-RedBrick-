import {
    Video,
    Activity,
    Map,
    Settings,
    Radio,
    AlertTriangle,
    Gauge,
    Cpu,
    Zap,
    Shield,
    Wifi
} from 'lucide-react';

const navItems = [
    { id: 'live-feed', label: 'Live Feed', icon: Video, badge: 'LIVE' },
    { id: 'gas-telemetry', label: 'Gas Telemetry', icon: Activity },
    { id: 'map-view', label: 'Map View', icon: Map },
    { id: 'diagnostics', label: 'System Diagnostics', icon: Settings },
];

const statusItems = [
    { label: 'Motor Systems', status: 'online', icon: Zap },
    { label: 'Vision Core', status: 'online', icon: Cpu },
    { label: 'Gas Sensors', status: 'online', icon: Activity },
    { label: 'Communication', status: 'online', icon: Wifi },
];

export default function Sidebar({ activeTab, onTabChange }) {
    return (
        <aside className="w-72 bg-gradient-to-b from-[#0a0a12] to-[#050508] border-r border-white/5 flex flex-col">
            {/* Logo Section */}
            <div className="p-6 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00ff41] via-[#00cc33] to-[#00ff41] flex items-center justify-center shadow-lg shadow-[#00ff41]/30">
                            <Radio className="w-6 h-6 text-black" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#0a0a12] flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#00ff41] animate-pulse shadow-[0_0_8px_#00ff41]" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-base font-bold text-white tracking-wide">NALI-BOT</h1>
                        <p className="text-[11px] text-[#00ff41] tracking-[0.2em] font-medium">CONTROL CORE</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
                <div className="mb-3 px-3">
                    <span className="text-[10px] text-white/30 tracking-[0.15em] uppercase font-medium">Navigation</span>
                </div>
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;

                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => onTabChange(item.id)}
                                    className={`nav-item w-full ${isActive ? 'active' : ''}`}
                                >
                                    <div className={`p-2 rounded-lg transition-all duration-300 ${isActive
                                            ? 'bg-[#00ff41]/10'
                                            : 'bg-white/5'
                                        }`}>
                                        <Icon className={`w-4 h-4 transition-all duration-300 ${isActive ? 'text-[#00ff41] drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]' : 'text-white/50'
                                            }`} />
                                    </div>
                                    <span className={`text-sm font-medium ${isActive ? 'text-white' : ''}`}>
                                        {item.label}
                                    </span>
                                    {item.badge && (
                                        <span className="ml-auto px-2 py-0.5 rounded text-[9px] font-bold tracking-wider bg-[#ff3333]/20 text-[#ff3333] border border-[#ff3333]/30 animate-pulse">
                                            {item.badge}
                                        </span>
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>

                {/* System Status */}
                <div className="mt-8">
                    <div className="mb-3 px-3">
                        <span className="text-[10px] text-white/30 tracking-[0.15em] uppercase font-medium">System Status</span>
                    </div>
                    <div className="space-y-2">
                        {statusItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-200"
                                >
                                    <Icon className="w-3.5 h-3.5 text-white/30" />
                                    <span className="text-xs text-white/50 flex-1">{item.label}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[9px] text-[#00ff41]/80 uppercase tracking-wider font-medium">OK</span>
                                        <div className="status-dot connected pulse-glow" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* Quick Stats */}
            <div className="p-4 border-t border-white/5">
                <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                        <div className="flex items-center gap-2 mb-2">
                            <Gauge className="w-3.5 h-3.5 text-[#00ff41]" />
                            <span className="text-[10px] text-white/40 uppercase tracking-wider">Runtime</span>
                        </div>
                        <span className="text-base text-white font-mono font-medium">02:34:17</span>
                    </div>
                    <div className="p-3 rounded-xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5">
                        <div className="flex items-center gap-2 mb-2">
                            <Cpu className="w-3.5 h-3.5 text-[#00ff41]" />
                            <span className="text-[10px] text-white/40 uppercase tracking-wider">CPU</span>
                        </div>
                        <span className="text-base text-white font-mono font-medium">23%</span>
                    </div>
                </div>
            </div>

            {/* Safety Notice */}
            <div className="p-4 border-t border-white/5">
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#ff9f00]/10 to-[#ff9f00]/5 border border-[#ff9f00]/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff9f00]/50 to-transparent" />
                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-[#ff9f00]/10">
                            <Shield className="w-4 h-4 text-[#ff9f00]" />
                        </div>
                        <div>
                            <span className="text-[10px] text-[#ff9f00] uppercase tracking-widest font-semibold">Safety Protocol</span>
                            <p className="text-[11px] text-white/50 leading-relaxed mt-1">
                                Verify gas levels before any confined space entry.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
