import { useState, useEffect } from 'react';
import VideoOverlay from './VideoOverlay';
import DetectionBox from './DetectionBox';
import { Camera, Maximize2, Volume2, Settings, Circle, Pause, Play, RotateCcw } from 'lucide-react';

export default function VideoFeed({ currentReadings }) {
    const [isRecording, setIsRecording] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const [detections, setDetections] = useState([]);
    const [videoTime, setVideoTime] = useState(0);

    // Simulate video time and trigger detections
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setVideoTime(prev => {
                const newTime = (prev + 1) % 30; // 30-second loop

                // Trigger detections at specific times
                if (newTime === 5) {
                    setDetections([{
                        id: Date.now(),
                        type: 'crack',
                        label: 'CRACK DETECTED',
                        sublabel: 'Structural Anomaly',
                        confidence: 96,
                        severity: 'HIGH',
                        position: { x: 30, y: 35, width: 28, height: 22 },
                    }]);
                } else if (newTime === 15) {
                    setDetections([{
                        id: Date.now(),
                        type: 'blockage',
                        label: 'BLOCKAGE DETECTED',
                        sublabel: 'Obstruction Identified',
                        confidence: 89,
                        severity: 'MEDIUM',
                        position: { x: 45, y: 28, width: 32, height: 38 },
                    }]);
                } else if (newTime === 10 || newTime === 20 || newTime === 25) {
                    setDetections([]);
                }

                return newTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isPaused]);

    return (
        <div className="h-full flex flex-col glass-card">
            {/* Video Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-[#00ff41]/10">
                        <Camera className="w-4 h-4 text-[#00ff41]" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-white font-medium">Primary Camera Feed</span>
                            <span className="px-2 py-0.5 rounded text-[9px] font-mono text-white/40 bg-white/5">CAM-01</span>
                        </div>
                        <span className="text-[10px] text-white/30">1080p @ 30fps • Low Latency Mode</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {isRecording && (
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#ff3333]/10 border border-[#ff3333]/20">
                            <Circle className="w-2 h-2 fill-[#ff3333] text-[#ff3333] animate-pulse" />
                            <span className="text-[10px] text-[#ff3333] font-mono uppercase tracking-wider">Recording</span>
                        </div>
                    )}
                    <button
                        onClick={() => setIsPaused(!isPaused)}
                        className="btn-ghost"
                    >
                        {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                    </button>
                    <button className="btn-ghost">
                        <RotateCcw className="w-4 h-4" />
                    </button>
                    <button className="btn-ghost">
                        <Volume2 className="w-4 h-4" />
                    </button>
                    <button className="btn-ghost">
                        <Settings className="w-4 h-4" />
                    </button>
                    <div className="w-px h-5 bg-white/10 mx-1" />
                    <button className="btn-ghost">
                        <Maximize2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Video Container */}
            <div className="flex-1 relative bg-[#030305] overflow-hidden rounded-b-2xl">
                {/* Simulated Sewer Tunnel */}
                <div className="absolute inset-0">
                    {/* Base gradient - dark tunnel feeling */}
                    <div
                        className="w-full h-full"
                        style={{
                            background: `
                radial-gradient(ellipse 100% 80% at 50% 55%, #1a1816 0%, #0a0908 40%, #030303 100%)
              `,
                        }}
                    />

                    {/* Tunnel depth effect */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `
                radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, rgba(0,0,0,0.6) 100%)
              `,
                        }}
                    />

                    {/* Light cone from robot */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `
                radial-gradient(ellipse 45% 35% at 50% 55%, rgba(120,115,100,0.12) 0%, transparent 70%)
              `,
                        }}
                    />

                    {/* Pipe/wall textures - subtle lines */}
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-[15%] left-[5%] w-[25%] h-[2px] bg-gradient-to-r from-transparent via-[#3a3530] to-transparent rounded" />
                        <div className="absolute top-[25%] right-[10%] w-[20%] h-[1px] bg-gradient-to-r from-transparent via-[#2a2520] to-transparent rounded" />
                        <div className="absolute top-[40%] left-[15%] w-[12%] h-[3px] bg-gradient-to-r from-transparent via-[#252220] to-transparent rounded" />
                        <div className="absolute bottom-[30%] right-[20%] w-[15%] h-[2px] bg-gradient-to-r from-transparent via-[#302a25] to-transparent rounded" />
                        <div className="absolute bottom-[20%] left-[25%] w-[8%] h-[2px] bg-gradient-to-r from-transparent via-[#282520] to-transparent rounded" />
                    </div>

                    {/* Water/moisture effect at bottom */}
                    <div
                        className="absolute bottom-0 left-0 right-0 h-[30%]"
                        style={{
                            background: `linear-gradient(to top, rgba(20,30,35,0.4) 0%, transparent 100%)`,
                        }}
                    />
                </div>

                {/* Vignette Effect */}
                <div className="vignette" />

                {/* Grid Overlay */}
                <div className="grid-overlay" />

                {/* Scanline Effect */}
                <div className="scanline-overlay" />

                {/* HUD Overlay */}
                <VideoOverlay currentReadings={currentReadings} videoTime={videoTime} />

                {/* Detection Boxes */}
                {detections.map(detection => (
                    <DetectionBox key={detection.id} detection={detection} />
                ))}

                {/* Center Crosshairs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
                    <div className="relative w-16 h-16">
                        {/* Horizontal line */}
                        <div className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2">
                            <div className="absolute left-0 w-[30%] h-full bg-gradient-to-r from-transparent to-[#00ff41]/40" />
                            <div className="absolute right-0 w-[30%] h-full bg-gradient-to-l from-transparent to-[#00ff41]/40" />
                        </div>
                        {/* Vertical line */}
                        <div className="absolute left-1/2 top-0 w-[1px] h-full -translate-x-1/2">
                            <div className="absolute top-0 w-full h-[30%] bg-gradient-to-b from-transparent to-[#00ff41]/40" />
                            <div className="absolute bottom-0 w-full h-[30%] bg-gradient-to-t from-transparent to-[#00ff41]/40" />
                        </div>
                        {/* Center dot */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-[#00ff41]/50" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00ff41]/60" />
                    </div>
                </div>

                {/* Corner Brackets */}
                <div className="corner-bracket top-left" />
                <div className="corner-bracket top-right" />
                <div className="corner-bracket bottom-left" />
                <div className="corner-bracket bottom-right" />

                {/* Timeline Bar at Bottom */}
                <div className="absolute bottom-4 left-16 right-16 z-30">
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[#00ff41] to-[#00ff41]/60 rounded-full transition-all duration-1000"
                            style={{ width: `${(videoTime / 30) * 100}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
