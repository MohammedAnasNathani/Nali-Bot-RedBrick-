import { useState, useEffect, useCallback, useRef } from 'react';
import { generateLogEntry, formatTimestamp } from '../utils/dataGenerators';

const MAX_LOGS = 50;

export function useLogs() {
  const [logs, setLogs] = useState(() => {
    // Initialize with a few startup logs
    return [
      { id: 1, type: 'info', message: 'System boot sequence initiated', timestamp: new Date(Date.now() - 10000) },
      { id: 2, type: 'success', message: 'All subsystems online', timestamp: new Date(Date.now() - 8000) },
      { id: 3, type: 'info', message: 'Establishing communication link...', timestamp: new Date(Date.now() - 6000) },
      { id: 4, type: 'success', message: 'Control Station connected', timestamp: new Date(Date.now() - 4000) },
      { id: 5, type: 'info', message: 'Vision Core: Calibrating sensors', timestamp: new Date(Date.now() - 2000) },
      { id: 6, type: 'success', message: 'Nali-Bot Control Core v1.0 READY', timestamp: new Date() },
    ];
  });

  const idCounter = useRef(7);

  const addLog = useCallback((type, message) => {
    const newLog = {
      id: idCounter.current++,
      type,
      message,
      timestamp: new Date(),
    };
    
    setLogs(prev => [...prev.slice(-MAX_LOGS + 1), newLog]);
  }, []);

  const generateRandomLog = useCallback(() => {
    const entry = generateLogEntry();
    addLog(entry.type, entry.message);
  }, [addLog]);

  useEffect(() => {
    // Generate a new log every 2-4 seconds
    const generateLog = () => {
      generateRandomLog();
      const nextInterval = 2000 + Math.random() * 2000;
      timeoutRef.current = setTimeout(generateLog, nextInterval);
    };

    const timeoutRef = { current: null };
    timeoutRef.current = setTimeout(generateLog, 2000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [generateRandomLog]);

  return {
    logs,
    addLog,
    formatTimestamp,
  };
}
