import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import VideoFeed from '../video/VideoFeed';
import TelemetryPanel from '../telemetry/TelemetryPanel';
import SystemLogs from '../logs/SystemLogs';
import { useTelemetry } from '../../hooks/useTelemetry';
import { useLogs } from '../../hooks/useLogs';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('live-feed');
    const { methaneData, pressureData, currentReadings } = useTelemetry();
    const { logs, formatTimestamp } = useLogs();

    return (
        <div className="h-screen w-screen bg-[#050508] flex overflow-hidden">
            {/* Background Gradient Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00ff41]/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#0088ff]/5 rounded-full blur-[150px]" />
            </div>

            {/* Sidebar */}
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Header */}
                <Header currentReadings={currentReadings} />

                {/* Main Grid */}
                <main className="flex-1 p-5 overflow-hidden">
                    <div className="h-full grid grid-cols-12 grid-rows-6 gap-5">
                        {/* Video Feed - Takes up left 8 columns, 4 rows */}
                        <div className="col-span-8 row-span-4">
                            <VideoFeed currentReadings={currentReadings} />
                        </div>

                        {/* Telemetry Panel - Right side, 4 rows */}
                        <div className="col-span-4 row-span-4">
                            <TelemetryPanel
                                methaneData={methaneData}
                                pressureData={pressureData}
                                currentReadings={currentReadings}
                            />
                        </div>

                        {/* System Logs - Bottom, full width */}
                        <div className="col-span-12 row-span-2">
                            <SystemLogs logs={logs} formatTimestamp={formatTimestamp} />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
