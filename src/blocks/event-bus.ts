export class EventBus {
    private listeners: { [index: string]: any } = {}; 

    constructor() {}
  
    on(event: any, callback: any) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
  
      this.listeners[event].push(callback);
    }
  
    off(event: string, callback: any) {
      if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }
  
      this.listeners[event] = this.listeners[event].filter(
        (listener: any) => listener !== callback
      );
    }
  
    emit(event: string, ...args: any[]) {
      if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }
      
      this.listeners[event].forEach((listener: any) => {
        listener(...args);
      });
    }
  }