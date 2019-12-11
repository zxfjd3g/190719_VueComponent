function Compile(el, vm) {
    // 保存vm
    this.$vm = vm;
    // 保存el元素
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {
        // 1. 将el元素中的所有子节点保存到一个fragment容器中
        this.$fragment = this.node2Fragment(this.$el);
        // 2. 编译fragment中所有层次子节点(通过递归调用)
        this.init();
        // 3. 将编译好的fragment添加到el元素中
        this.$el.appendChild(this.$fragment);
    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        var fragment = document.createDocumentFragment(),
            child;

        // 将原生节点拷贝到fragment
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        this.compileElement(this.$fragment);
    },

    /* 
    编译指定element/fragment的子节点
    */
    compileElement: function(el) {
        // 得到所有子节点
        var childNodes = el.childNodes,
            me = this;
        // 遍历所有子节点
        [].slice.call(childNodes).forEach(function(node) {
            // 得到子节点的文本内容
            var text = node.textContent;
            // 定义用来匹配插值语法的正则对象
            var reg = /\{\{(.*)\}\}/;
            // 如果当前节点是元素节点
            if (me.isElementNode(node)) {
                // 编译元素节点中所有指令属性
                me.compile(node);
            // 如果是插值语法格式的文本节点
            } else if (me.isTextNode(node) && reg.test(text)) {
                // 编译文本节点
                me.compileText(node, RegExp.$1);
            }
            // 如果当前子节点还有子节点
            if (node.childNodes && node.childNodes.length) {
                // 进行递归调用 ==> 实现对所有层次子节点的编译处理
                me.compileElement(node);
            }
        });
    },

    compile: function(node) {
        // 得到当前元素的所有属性节点
        var nodeAttrs = node.attributes,
            me = this;
        // 遍历属性节点
        [].slice.call(nodeAttrs).forEach(function(attr) {
            // 得到属性名: v-on:click
            var attrName = attr.name;
            // 如果是指令属性
            if (me.isDirective(attrName)) {
                // 得到属性值(表达式)
                var exp = attr.value;
                // 从属性名中取出指令名
                var dir = attrName.substring(2);
                // 如果是事件指令
                if (me.isEventDirective(dir)) {
                    // 编译处理这个事件指令
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                // 普通指令
                } else {
                    // 编译处理一般指令
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }
                // 移除指令属性
                node.removeAttribute(attrName);
            }
        });
    },

    compileText: function(node, exp) {
        // 让编译工具对象处理文本节点的编译
        compileUtil.text(node, this.$vm, exp);
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

/* 
编译模板语法的工具对象
*/
var compileUtil = {
    /* 编译v-text和{{}} */
    text: function(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },

    /* 编译v-html */
    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    /* 编译v-model */
    model: function(node, vm, exp) {
        /* 
        1. 在内存初始更新节点
        2. 创建watcher, 用于input的更新
        */
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        // 给当前元素绑定input事件监听
        node.addEventListener('input', function(e) {
            // 得到输入的最新值
            var newValue = e.target.value;
            // 将最新值保存到表达式在data中对应的属性上  ===> 触发数据绑定的流程
            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    /* 编译v-class*/
    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    /* 
    真正用于编译模板语法的方法 
    exp: 表达式   name
    dir: 指令名  text/html/class/model
    */
    bind: function(node, vm, exp, dir) {
        // 根据指令名得到对应的更新函数
        var updaterFn = updater[dir + 'Updater'];
        // 执行更新函数第一次更新节点 ==> 初始化显示
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));

        // 为当前表达式创建一个对应的watcher ==> 用于更新当前节点
        new Watcher(vm, exp, function(value, oldValue) { // 绑定用于更新的函数
            // 更新节点
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件指令处理
    eventHandler: function(node, vm, exp, dir) {
        // 根据指令名得到事件名/类型
        var eventType = dir.split(':')[1],
        // 根据表达式从methods中取出对应的事件回调函数
            fn = vm.$options.methods && vm.$options.methods[exp];
        // 给当前节点绑定指定事件名和回调函数的DOM事件监听  回调函数指定this为vm
        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    /* 得到指定表达式在data中对应的属性值 */
    _getVMVal: function(vm, exp) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k) {
            val = val[k];
        });
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};

/* 
包含n个用于更新真实DOM的方法的工具对象
*/
var updater = {
    /* 更新节点(元素/文本)的textContent属性 */
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    /* 更新元素节点的innerHTML属性 */
    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    /* 更新元素节点的className属性 */
    classUpdater: function(node, value, oldValue) {
        // 得到静态类名
        var className = node.className;
        // 指定className
        node.className = className ? className + ' ' + value : value
    },

    /* 更新元素节点的value属性 */
    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};