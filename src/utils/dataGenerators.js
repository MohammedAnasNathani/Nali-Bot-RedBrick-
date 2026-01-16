// Mock Data Generators for Nali-Bot Telemetry
// Generates realistic sensor data with natural variations

/**
 * Generate methane (CH4) reading in PPM
 * Normal range: 15-25 PPM
 * Warning threshold: 35 PPM
 * Critical threshold: 50 PPM
 */
export function generateMethaneReading(previousValue = 20) {
  // Add realistic noise with occasional spikes
  const noise = (Math.random() - 0.5) * 4;
  const drift = (Math.random() - 0.5) * 2;
  
  // Occasionally simulate a gas pocket detection (5% chance)
  const spikeChance = Math.random();
  let spike = 0;
  if (spikeChance > 0.95) {
    spike = Math.random() * 25 + 15; // Spike of 15-40 PPM
  }
  
  let newValue = previousValue + noise + drift + spike;
  
  // Gradually return to normal if spiked
  if (newValue > 35) {
    newValue -= Math.random() * 3;
  }
  
  // Clamp to realistic range
  return Math.max(10, Math.min(65, newValue));
}

/**
 * Generate robot internal pressure in PSI
 * Normal range: 12-16 PSI
 */
export function generatePressureReading(previousValue = 14) {
  const noise = (Math.random() - 0.5) * 0.5;
  const drift = (Math.random() - 0.5) * 0.2;
  
  let newValue = previousValue + noise + drift;
  
  // Mean reversion to 14 PSI
  newValue += (14 - newValue) * 0.1;
  
  return Math.max(11, Math.min(17, newValue));
}

/**
 * Generate depth reading in meters
 */
export function generateDepthReading(previousValue = 12) {
  const change = (Math.random() - 0.5) * 0.3;
  let newValue = previousValue + change;
  return Math.max(5, Math.min(25, newValue));
}

/**
 * Generate random system log entries
 */
const logTemplates = [
  { type: 'info', messages: [
    'Actuator 1: Position nominal',
    'Actuator 2: Pressure stabilized',
    'Actuator 3: Calibration complete',
    'Motor Controller: RPM within tolerance',
    'Power System: Battery at {battery}%',
    'Navigation: Waypoint {waypoint} reached',
    'Communication Link: Signal strength {signal}dB',
    'Thermal System: Core temp {temp}°C',
    'Hydraulic System: Flow rate normal',
    'Sensor Array: All sensors online',
  ]},
  { type: 'success', messages: [
    'Vision Core: Clear path detected',
    'AI Analysis: No anomalies found',
    'Stabilization: Balance optimal',
    'Data Sync: Upload complete',
    'Navigation: Route optimized',
    'Self-Diagnostic: All systems green',
  ]},
  { type: 'warning', messages: [
    'Vision Core: Object detected (Debris)',
    'Gas Sensor: Elevated CH4 levels',
    'Humidity Sensor: 92% detected',
    'Navigation: Minor obstruction ahead',
    'Motor 2: Slight vibration detected',
    'Battery: Switching to reserve cell',
  ]},
  { type: 'danger', messages: [
    'Vision Core: CRACK DETECTED - Severity: HIGH',
    'Vision Core: BLOCKAGE DETECTED - 78% obstruction',
    'Gas Alert: H2S levels approaching threshold',
    'WARNING: Structural anomaly detected',
    'CRITICAL: Water ingress sensor triggered',
  ]},
];

export function generateLogEntry() {
  // Weight towards info logs
  const typeWeights = [0.6, 0.25, 0.12, 0.03];
  const random = Math.random();
  let cumulative = 0;
  let selectedType = logTemplates[0];
  
  for (let i = 0; i < typeWeights.length; i++) {
    cumulative += typeWeights[i];
    if (random <= cumulative) {
      selectedType = logTemplates[i];
      break;
    }
  }
  
  const messages = selectedType.messages;
  let message = messages[Math.floor(Math.random() * messages.length)];
  
  // Replace placeholders with random values
  message = message
    .replace('{battery}', Math.floor(Math.random() * 30 + 70))
    .replace('{waypoint}', Math.floor(Math.random() * 20 + 1))
    .replace('{signal}', Math.floor(Math.random() * 20 - 60))
    .replace('{temp}', Math.floor(Math.random() * 10 + 35));
  
  return {
    type: selectedType.type,
    message,
    timestamp: new Date(),
  };
}

/**
 * Generate AI detection events
 */
export function generateDetectionEvent() {
  const detections = [
    { type: 'crack', label: 'CRACK DETECTED', confidence: Math.floor(Math.random() * 10 + 90) },
    { type: 'blockage', label: 'BLOCKAGE DETECTED', confidence: Math.floor(Math.random() * 15 + 85) },
    { type: 'debris', label: 'DEBRIS IDENTIFIED', confidence: Math.floor(Math.random() * 20 + 75) },
    { type: 'corrosion', label: 'CORROSION DETECTED', confidence: Math.floor(Math.random() * 12 + 88) },
  ];
  
  return detections[Math.floor(Math.random() * detections.length)];
}

/**
 * Format timestamp for display
 */
export function formatTimestamp(date) {
  return date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}
