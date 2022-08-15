# React tips

## 什么是虚拟DOM

- 虚拟DOM（VDOM）它是真实DOM的内存表示，一种编程概念，一种模式，会与真实的DOM同步，比如通过ReactDOM这种库，这个同步的过程叫做调和(reconcilation)。

## 虚拟DOM如何实现的

- React 是把真实的 DOM 树转换为 JS 对象树，也就是 Virtual DOM。每次数据更新后，重新计算 VM，并和上一次生成的 VM 树进行对比，对发生变化的部分进行批量更新。除了性能之外，VM 的实现最大的好处在于和其他平台的集成。

## 为什么VDOM可以提高性能

- 因为VDOM并不是真实的操作DOM，通过diff算法可以避免一些不必要的DOM操作，从而提高了性能

## React 中的类组件和函数组件有什么区别

### 类组件

- 无论是使用函数或是类来声明一个组件，他绝不能修改它自己的props
  - 所有组件都必须是纯函数，并禁止修改其自身的props
- React是单向数据流，父组件改变了属性，那么子组件视图会更新
  - 属性props是外界传递过来的，状态state是组件本身的，状态可以在组件中任意修改。
  - 组建的属性和状态改变都会更新视图

### 函数组件

- 函数组件接收一个单一的props对象并返回了一个React元素

### 区别

- 语法上：函数组件是一个纯函数，而类组件需要去继承React.Component并创建render返回react元素
- 状态管理：函数组件使用hooks来管理state
- 生命周期钩子：不能在函数组件中使用生命周期钩子

## 什么是高阶组件

- 高阶组件就是一个函数，该函数接受一个组件作为参数并返回一个新组建
  - 高阶组件（HOC）是一种复用组件逻辑的一种技巧
  - 高阶组件的参数为一个组件返回一个新的组件
  - 组件是将props转换为UI，而高阶组件是将组件转换为另一个组件

## 什么是受控组件

- 受控组件就是组件的状态受React控制。

## PureComponent 和 Component

- PureComponent 和 Component的区别是：Component需要手动实现 shouldComponentUpdate，而 PureComponent 通过浅对比默认实现了 shouldComponentUpdate 方法。

- 总结： PureComponent 不仅会影响本身，而且会影响子组件，所以 PureComponent 最佳情况是展示组件

## React生命周期

### 挂载

当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

- constructor()
- static getDerivedStateFromProps()
- render()
- componentDidMount()

### 更新

当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：

- static getDerivedStateFromProps()
- shouldComponentUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate()

### 卸载

当组件从 DOM 中移除时会调用如下方法：

- componentWillUnmount()

### 错误处理

渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法：

static getDerivedStateFromError()
componentDidCatch()

## 为什么不能直接修改state

- react中不能直接修改state，因为不会重新触发render，setState通过一个队列机制来实现state更新，当执行setState的时候，会将需要更新的state合并后放入状态队列，而不会立刻更新this.state。队列机制可以高效的批量更新state，如果不通过setState而直接修改this.state，那么该state将不会被放入队列中，下次setState合并队列时，会忽略之前修改过的state。

## React中如果绑定事件使用匿名函数有什么影响

- 因为使用的是匿名函数，所以组件每次都会认为是一个新的props，不会使用缓存优化，在性能上会有一定的损耗

## setState是同步的还是异步的

- 在React中，如果是由React引发的事件处理，调用setState不会同步更新this.state，除此之外会同步执行，除此之外指的是绕过React通过addEventListner直接添加的事件处理函数，还有通过setTimeout/setInterval产生的异步调用
- setState只有在合成事件和钩子函数重视异步的，在原生事件和setTimeout中是同步的，setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，
导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。

## React 的事件代理机制

- React 并不会把所有的处理函数直接绑定在真实的节点上。而是把所有的事件绑定到结构的最外层，使用一个统一的事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部的事件监听和处理函数。当组件挂载或卸载时，只是在这个统一的事件监听器上插入或删除一些对象。当事件发生时，首先被这个统一的事件监听器处理，然后在映射里找到真正的事件处理函数并调用。这样做的优点是解决了兼容性问题，并且简化了事件处理和回收机制（不需要手动的解绑事件，React 已经在内部处理了）。但是有些事件 React 并没有实现，比如 window 的 resize 事件。

## hooks

- 状态钩子 (useState): 用于定义组件的 State，类似类定义中 this.state 的功能
- 生命周期钩子 (useEffect): 类定义中有许多生命周期函数，而在 React Hooks 中也提供了一个相应的函数 (useEffect)，这里可以看做componentDidMount、componentDidUpdate和componentWillUnmount的结合。
- useContext: 获取 context 对象
- useCallback: 缓存回调函数，避免传入的回调每次都是新的函数实例而导致依赖组件重新渲染，具有性能优化的效果；
- useMemo: 用于缓存传入的 props，避免依赖的组件每次都重新渲染；
- useRef: 获取组件的真实节点；

## Link 与 a 标签的区别

- Link避免了不必要的重新渲染

- Link 跳转做了三件事
  - 有onclick那就执行onclick
  - click的时候阻止a标签默认事件
  - 根据跳转 href，用 history 跳转，此时只是链接变了，并没有刷新页面

## React 的 diff算法

- DOM 节点的跨层级移动的操作特别少，可以忽略不计
- 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构
- 对于同一层级的一组子节点，可以通过唯一的 id 进行区分

- tree diff
  - 因为上面的三个策略中的第一点， DOM 节点的跨级操作比较少，那么 diff 算法只会对相同层级的 DOM 节点进行比较。如果发现节点不存在 那么会将该节点以及其子节点完全删除，不会再继续比较。如果出现了 DOM 节点的跨层级的移动操作，那么会删除改节点以及其所有的子节点，然后再移动后的位置重新创建。
- component diff
  - 如果是同一类型的组件，那么会继续对比 VM 数，如果不是同一类型的组件，那么会将其和其子节点完全替换，不会再进行比对，同一类型的组件，有可能 VM 没有任何的变化，如果可以确定的知道这点，那么就可以节省大量的 diff 时间，所以用户可以设置 shouldComponentUpdate() 来判断是否需要进行 diff 算法。
- element diff
  - 当节点处于同一层级的时候时，有三种操作：INSERT_MAKEUP插入、 MOVE_EXISTING 移动、 REMOVE_NODE 删除。这里 React 有一个优化策略，对于同一层级的同组子节点，添加唯一的 key 进行区分。这样的话，就可以判断出来是否是移动节点。通过 key 发现新旧集合中的节点都是相同的节点，就只需要进行移动操作就可以。

## React Hooks当中的useEffect是如何区分生命周期钩子的

- useEffect可以看成是 componentDidMount，componentDidUpdate 和 componentWillUnmount 三者结合
- useEffect(callback, [source]) 接收两个参数

  ```JS
  useEffect(() => {
    console.log('mounted')
    // 回调函数会在组件卸载时执行
    return () => {
      console.log('willUnmount')
    }
  })
  ```

- 生命周期函数的调用主要通过第二个参数来进行控制
  - [source] 参数不传时，则每次都会优先调用上次保存的函数中返回的那个函数，然后再调用外部那个函数
  - [source] 参数传[]时，则外部的函数只会在初始化时调用一次，返回的那个函数也只会最终在组件卸载时调用一次；
  - [source]参数有值时，则只会监听到数组中的值发生变化后才优先调用返回的那个函数，再调用外部的函数。
