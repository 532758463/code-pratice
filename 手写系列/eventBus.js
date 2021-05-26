class EventBus {
  listeners = [];

  on(name, fn) {
    const listener = {
      name,
      fn,
      isOnce: false,
    };

    this.listeners.push(listener);
    return listener;
  }

  once(name, fn) {
    const listener = {
      name,
      fn,
      isOnce: true,
    };
    this.listeners.push(listener);
    return listener;
  }

  off(listener) {
    const index = this.listeners.findIndex((lst) => lst === listener);

    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  emit(name, data) {
    for (const listener of this.listeners) {
      if (listener.name === name) {
        try {
          if (listener.isOnce) this.off(listener);
          listener.fn(data);
        } catch (error) {
          console.log("bus emit error", error);
        }
      }
    }
  }
}


const eventBus = new EventBus();

const test1 = eventBus.on("console", (data)=> console.log(data))

eventBus.emit("console",2)
