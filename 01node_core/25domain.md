## domain模块
使用domian模块中的create方法创建一个domain对象，`var domain = domain.create()`,create方法没有任何参数，该方法返回被创建的Domain对象。该对象是一个继承了EventEmitter类的实例对象，当该对象捕获到任何错误时，触发该对象的error事件。可以通过监听该对象的error事件并指定事件回调汉书的方法来实现当捕捉到错误时的处理。`domain.on('error', function(err){})`

domain模块中，为Domain对象定义了一个name属性值，可以使用该属性值来设置或获取该Domain对象的名称。

在Domain对象被创建后，需要指定该对象所监听的代码，我们需要将这些代码书写在一个函数中，并且使用Domain对象的run方法指定Domain对象监听该函数中的代码。当这些代码触发任何错误时，将被Domain对象捕获。Domain对象的run方法的指定方法如下`domain.run(fn)`

在Domain对象的run方法中，使用一个参数，参数值为一个函数，当该函数中触发任何错误时，将被Domain对象捕获。
