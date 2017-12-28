## 使用util模块中提供的一些方法

+ format方法
类似于C语言中的printf方法,将第一个参数值作为一个格式化字符串,将其他参数值作为该格式化字符串中所使用的各中参数,返回一个经过格式化处理后的字符串.
`util.format('您输入了%d个参数,参数值分别为%s,%s,%s',3,'nice','excelent','holy');`
格式化字符串中,可以使用的参数指定符号
    * %s:用于指定字符串参数
    * %d:用于指定数值参数,包括整数及浮点数
    * %j:用于指定一个JSON对象
    * %%:用于指定一个百分号
    * 如果格式化字符串中使用的参数个数多于format方法中使用的除了format参数之外的其他参数,则格式化字符串中多于的参数将不被替换.`console.log(util.format('%s:%s','one'));`
    * 如果格式化字符串中使用的参数个数少于format方法中使用的除了format参数之外的其他参数,则根据format方法中多于参数值的类型自动将其转换为字符串,中间使用一个空格进行分割.

+ inspect(object, [options])返回一个字符串,该字符串包含了对象的信息,在调试应用程序的过程中非常有用.
    * showHidden <boolean> 如果为 true,则 object 的不可枚举的符号与属性也会被包括在格式化后的结果中. 默认为 false.
    * depth <number> 指定格式化 object 时递归的次数. 这对查看大型复杂对象很有用. 默认为 2. 若要无限地递归则传入    null.
    * colors <boolean> 如果为 true,则输出样式使用 ANSI 颜色代码. 默认为 false. 颜色可自定义.
    * customInspect <boolean> 如果为 false,则 object 上自定义的 inspect(depth, opts) 函数不会被调用. 默认为 true.
    * showProxy <boolean> 如果为 true,则 Proxy 对象的对象和函数会展示它们的 target 和 handler 对象. 默认为 false.
    * maxArrayLength <number> 指定格式化时数组和 TypedArray 元素能包含的最大数量. 默认为 100. 设为 null   则显式全部数组元素. 设为 0 * 或负数则不显式数组元素.
    * breakLength <number> 一个对象的键被拆分成多行的长度. 设为 Infinity 则格式化一个对象为单行. 默认为 60.

+ 自定义 util.inspect 颜色
可以通过 `util.inspect.styles` 和 `util.inspect.colors` 属性全局地自定义 util.inspect 的颜色输出（如果已启用）

