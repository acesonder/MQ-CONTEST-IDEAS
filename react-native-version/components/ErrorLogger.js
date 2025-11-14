/**
 * Advanced Error Logger for React Native VR Applications
 * Captures and stores errors with context for easier troubleshooting
 */

class ErrorLoggerClass {
  constructor() {
    this.logs = [];
    this.maxLogs = 100;
  }

  init() {
    // Override console methods
    const originalError = console.error;
    console.error = (...args) => {
      this.logError('ERROR', args.join(' '), {});
      originalError.apply(console, args);
    };

    const originalWarn = console.warn;
    console.warn = (...args) => {
      this.log('WARN', args.join(' '), {});
      originalWarn.apply(console, args);
    };

    this.log('INFO', 'Error Logger initialized');
  }

  log(type, message, context = {}) {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    const color = this.getColorForType(type);
    
    const logEntry = {
      timestamp,
      type,
      message,
      context,
      color
    };

    this.logs.push(logEntry);
    
    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Log to console
    console.log(`[${type}] ${message}`, context);
  }

  logError(type, message, context = {}) {
    this.log(type, message, context);
  }

  getColorForType(type) {
    const colors = {
      'ERROR': '#ff6b6b',
      'WARN': '#ffd93d',
      'INFO': '#6bcf7f',
      'PROMISE_REJECTION': '#ff6b6b',
      'CONSOLE_ERROR': '#ff6b6b'
    };
    return colors[type] || '#ffffff';
  }

  getLogs() {
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
    this.log('INFO', 'Logs cleared');
  }

  exportLogs() {
    return JSON.stringify(this.logs, null, 2);
  }
}

const ErrorLogger = new ErrorLoggerClass();
export default ErrorLogger;
