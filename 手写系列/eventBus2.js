class EventBus {
  events = new Map();

  on(name, fn) {
    this.events.set(name, { isOnce: false, fn });
  }

  once(name, fn) {
    this.events.set(name, { isOnce: true, fn });
  }

  off(name) {
    this.events.delete(name);
  }

  emit(name, data) {
    const emitFn = this.events.get(name);
    if (emitFn) {
      emitFn.isOnce && this.events.delete(name);
      emitFn.fn(data);
    }
  }
}

const eventBus = new EventBus();

const test1 = eventBus.on("console", (data) => console.log(data));

eventBus.emit("console", 2);
