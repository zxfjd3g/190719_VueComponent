function Observer(data) {
    // 保存data
    this.data = data;
    // 启动对data对象中数据的劫持
    this.walk(data);
}

Observer.prototype = {
    walk: function(data) {
        var me = this;
        // 遍历data的所有属性
        Object.keys(data).forEach(function(key) {
            // 将data中属性重新定义的响应式
            me.defineReactive(data, key, data[key])
        });
    },

    defineReactive: function(data, key, val) {
        // 创建一个对应的dep对象(订阅器/中间人)
        var dep = new Dep();
        // 通过隐式递归调用实现所有层次属性的监视/劫持
        var childObj = observe(val);

        // 给data重新定义属性, 添加setter/getter
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {

                // 用于建立dep与watcher的关系
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 偿试监视新的值的内部数据
                childObj = observe(newVal);
                // 通知订阅者
                dep.notify();
            }
        });
    }
};

function observe(value, vm) {

    if (!value || typeof value !== 'object') {
        return;
    }
    // 创建一个对应的observer对象
    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },

    depend: function() {
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        // 遍历每个订阅者watcher
        this.subs.forEach(function(sub) {
            // 去更新对应的节点
            sub.update();
        });
    }
};

Dep.target = null;