function Watcher(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.depIds = {};
    // 读取当前表达式对应的属性值
    this.value = this.get();
}

Watcher.prototype = {
    update: function() {
        this.run();
    },
    run: function() {
        var value = this.get();
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            // 调用绑定的更新节点的回调函数
            this.cb.call(this.vm, value, oldVal);
        }
    },
    addDep: function(dep) {
        // 判断watcher与dep的关系是否已经建立过
        if (!this.depIds.hasOwnProperty(dep.id)) {
            // 将watcher添加dep中, 建立dep到watcher的关系
            dep.addSub(this);
            // 将dep添加到watcher中, 建立watcher到dep的关系
            this.depIds[dep.id] = dep;
        }
    },
    get: function() {
        // 将当前watcher对象挂到Dep上
        Dep.target = this;
        // 读取表达式对应的属性值 ==> 调用对应的getter
        var value = this.getVMVal();
        Dep.target = null;
        return value;
    },

    getVMVal: function() {
        var exp = this.exp.split('.');
        var val = this.vm._data;
        exp.forEach(function(k) {
            val = val[k];
        });
        return val;
    }
};