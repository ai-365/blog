
# React组件的生命周期

组件第一次被渲染到DOM中的过程被称为挂载。删除dom中的组件的过程被成为卸载。组件从挂载到卸载及其他环节成为组件的生命周期。可以为组件声明一些特殊的方法，在挂载、卸载组件或组件生命周期中其他时间节点让组件去执行这些方法。这些方法叫做生命周期方法。生命周期方法由React主动调用。每个组件都包含一些默认生命周期方法，也可以重写这些方法，以便在组件的执行过程中执行这些方法。


组件挂载时生命周期方法的调用顺序为：
1. constructor()方法（构造方法）
2. getDerivedStateFromProps()方法
3. render()方法
4. componentDidMount()方法

当组件的参数或状态发生变化时会触发组件进行更新。组件更新时生命周期方法调用顺序为：
1. getDerivedStateFromProps()方法
2. shouldComponentUpdate()方法
3. render()方法
4. getSnapshotBeforeUpdate()方法
5. componentDidUpdate()。

组件卸载时会调用componentWillUnmount()方法。

在渲染过程、生命周期或子组件的构造方法中抛出错误时，会调用getDerivedStateFromProps()方法和componentDidCatch()方法。

**constructor()方法**

如果不需要初始化state和进行方法绑定，就不需要为组件实现构造方法constructor(props)。构造方法constructor(props)可简称为constructor()方法。

Rract组件挂载前会调用它的构造方法。在实现构造方法时，应在其他语句之前调用父类React.Component的super(props)。构造方法通常用于初始化内部state或进行事件处理两种情况。

如果组件需要使用内部state，可直接在构造方法中将this.state赋值初始化为state即可。要避免将props的值赋给state。如果需要在其它方法中为state赋值，应使用setState()方法。

**componentDidMount()方法**

componentDidMount()方法会在组件挂载后被立即调用。依赖于dom节点的初始化代码应该放在此方法中。例如，需要通过网络请求获取数据时，实例化请求的代码就可以放在此方法中。添加订阅功能的代码也适合放在此方法中。如果在此方法中添加了订阅功能，就要在componentWillUnmount()方法中取消订阅。

可以在componentDidMount()方法中调用setState()方法。它将触发额外渲染，此渲染会发生在浏览器更新UI界面之前。如果渲染依赖于其大小或位置的dom节点时，可以使用此方式处理。但须谨慎使用此种编码方式，因为它会导致性能问题。


**componentDidUpdate()方法**

componentDidUpdate()(prevProps, prevState, sanpshot)方法可以简称为componentDidUpdate()方法。componentDidUpdate()方法会在组件更新后被立即调用。首次渲染不会执行此方法。组件更新后，可以在此方法中对dom进行操作。如果需要对更新前后的props进行比较，也可以选择在此方法中进行。

可以在componentDidUpdate()方法中直接调用setState()方法。注意，setState()方法必须被包裹在一个条件语句里：否则，不仅会导致死循环，还会导致额外的重新渲染，影响组件性能。

如果组件实现了getSnapshotBeforeUodate()方法，那么它的返回值将作为componentDidUpdate()的第三个参数snapshot传入。否则，componentDidUpdate()的第三个参数为undefined。如果shouldcomponentUpdate()方法的返回值为false，就不会调用componentDidUpdate()方法。


**componentWillUnmount()方法**

componentWillUnmount()方法会在组件卸载及销毁之前直接调用。可以在此方法中执行必要的清理操作。例如，清除timer、取消网络请求或清除在componentDidMount()方法中添加的订阅等。

注意，不要在componentWillUnmount()中调用setState()方法，因为此时的组件将永远不会重新渲染，且组件被卸载后将永远无法再挂载它。

