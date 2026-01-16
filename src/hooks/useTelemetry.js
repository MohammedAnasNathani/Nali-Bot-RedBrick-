import { useState, useEffect, useCallback } from 'react';
import { generateMethaneReading, generatePressureReading, generateDepthReading } from '../utils/dataGenerators';

const MAX_DATA_POINTS = 60; // 1 minute of data at 1 second intervals

export function useTelemetry() {
  const [methaneData, setMethaneData] = useState(() => {
    // Initialize with some historical data
    const initial = [];
    let value = 20;
    for (let i = MAX_DATA_POINTS; i > 0; i--) {
      value = generateMethaneReading(value);
      initial.push({
        time: new Date(Date.now() - i * 1000).toLocaleTimeString('en-US', { hour12: false }),
        value: value,
        threshold: 35,
      });
    }
    return initial;
  });

  const [pressureData, setPressureData] = useState(() => {
    const initial = [];
    let value = 14;
    for (let i = MAX_DATA_POINTS; i > 0; i--) {
      value = generatePressureReading(value);
      initial.push({
        time: new Date(Date.now() - i * 1000).toLocaleTimeString('en-US', { hour12: false }),
        value: value,
      });
    }
    return initial;
  });

  const [currentReadings, setCurrentReadings] = useState({
    methane: 20,
    pressure: 14,
    depth: 12,
    temperature: 38,
    humidity: 85,
    batteryLevel: 87,
  });

  const updateTelemetry = useCallback(() => {
    const now = new Date().toLocaleTimeString('en-US', { hour12: false });
    
    setMethaneData(prev => {
      const lastValue = prev[prev.length - 1]?.value || 20;
      const newValue = generateMethaneReading(lastValue);
      const newData = [...prev.slice(-MAX_DATA_POINTS + 1), {
        time: now,
        value: parseFloat(newValue.toFixed(1)),
        threshold: 35,
      }];
      
      setCurrentReadings(curr => ({ ...curr, methane: newValue }));
      return newData;
    });

    setPressureData(prev => {
      const lastValue = prev[prev.length - 1]?.value || 14;
      const newValue = generatePressureReading(lastValue);
      const newData = [...prev.slice(-MAX_DATA_POINTS + 1), {
        time: now,
        value: parseFloat(newValue.toFixed(2)),
      }];
      
      setCurrentReadings(curr => ({ ...curr, pressure: newValue }));
      return newData;
    });

    // Update other readings
    setCurrentReadings(curr => ({
      ...curr,
      depth: generateDepthReading(curr.depth),
      temperature: 35 + Math.random() * 8,
      humidity: 80 + Math.random() * 15,
      batteryLevel: Math.max(0, curr.batteryLevel - Math.random() * 0.02),
    }));
  }, []);

  useEffect(() => {
    const interval = setInterval(updateTelemetry, 1000);
    return () => clearInterval(interval);
  }, [updateTelemetry]);

  return {
    methaneData,
    pressureData,
    currentReadings,
  };
}
