# 问题记录
+ [如何分析Node.js中的内存泄露](https://zhuanlan.zhihu.com/p/25736931)
+ js 中什么类型是引用传递, 什么类型是值传递? 如何将值类型的变量以引用的方式传递?
+ 如何编写一个 json 对象的拷贝函数
+ C++中指针和引用的区别
+ ES6中的set,map,symbol
+ class和symbol能否实现数据私有
+ ...的使用上，如何实现一个数组的去重(最好使用set)
+ const 定义的 Array 中间元素能否被修改? 如果可以, 那 const 修饰对象有什么意义?
	+ 其中的值可以被修改. 意义上, 主要保护引用不被修改 (如用 Map 等接口对引用的变化很敏感, 使用 const 保护引用始终如一是有意义的), 也适合用在 immutable 的场景.