/* 
定义一个PubSub对象模块
*/
(function (window) {
  // 定义PubSub对象
  const PubSub = {}
  // 用来保存所有待处理的回调函数的容器
  /* 
    {
      "add": {
        uid_1: callback1,
        uid_2: callback2
      },
      "delete": {
        uid_3: callback3
      }
    }
  */
  let callbackContainer = {}
  let id = 0

  // 1. token subscribe(msgName, callback): 订阅消息, 并返回一个标识token
  PubSub.subscribe = function (msg, callback) {
    // 读取保存callback的对应小容器, 如果不存在, 创建一个新的
    let callbacks = callbackContainer[msg]
    if (!callbacks) {
      callbacks = {}
      callbackContainer[msg] = callbacks
    }

    // 将callback添加到小容器
    const token = `uid_${msg}_${++id}`
    callbacks[token] = callback

    // 返回token
    return token
  }

  // 2. publish(msgName, data): 异步发布消息
  PubSub.publish = function (msg, data) {
    // 得到指定消息对应的回调小容器
    const callbacks = callbackContainer[msg]
    // 如果存在, 遍历对象的所有属性值函数并异步执行它
    if (callbacks) {
      Object.values(callbacks).forEach(callback => {
        setTimeout(() => {
          callback(msg, data) 
        })
      })
    }

  }

  // 3. publishSync(msgName, data): 同步发布消息
  PubSub.publishSync = function (msg, data) {
    // 得到指定消息对应的回调小容器
    const callbacks = callbackContainer[msg]
    // 如果存在, 遍历对象的所有属性值函数并同步执行它
    if (callbacks) {
      Object.values(callbacks).forEach(callback => {
        callback(msg, data) 
      })
    }
  }

  /* 
  4. unsubscribe(flag): 根据flag取消订阅
    1. flag没有指定: 取消所有
    2. flag是一个token值: 取消对应的一个回调
    3. flag是msgName: 取消对应的所有
  */
  PubSub.unsubscribe = function (flag) {
    if (flag===undefined) {
      callbackContainer = {}
    } else if (typeof flag==='string' && flag.indexOf('uid_')===0) {
      
      Object.values(callbackContainer).forEach(callbacks => {
        delete callbacks[flag]
      })

      // const msg = flag.split('_')[1]
      // callbackContainer[msg] && delete callbackContainer[msg][flag]
    } else {
      delete callbackContainer[flag]
    }
  }

  // 向外暴露PubSub
  window.PubSub = PubSub
})(window)
