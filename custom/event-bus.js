/* 
自定义全局事件总线对象模块
*/

(function (window) {
  const eventBus = {}

  let listenerContainer = {}

  eventBus.on = function (eventName, listener) {
    const listeners = listenerContainer[eventName]
    if (listeners) {
      listeners.push(listener)
    } else {
      listenerContainer[eventName] = [listener]
    }
  }

  eventBus.emit = function (eventName, data) {
    const listeners = listenerContainer[eventName]
    if (listeners && listeners.length>0) {
      listeners.forEach(listener => listener(data))
    }
  }

  eventBus.off = function (eventName) {
    if (eventName===undefined) {
      listenerContainer = {}
    } else {
      delete listenerContainer[eventName]
    }
  }

  window.eventBus = eventBus
})(window)