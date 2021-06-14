# 事件处理

我们在 [v-on事件监听指令](./vue_basic_use.md#_2-4-v-on事件监听指令)中已经使用`v-on`来监听事件。

- 可以用 `v-on` 指令监听 DOM 事件，并在触发时运行一些 JavaScript 代码。如`<button v-on:click="counter += 1">Add 1</button>`。
- 当事件逻辑比较复杂时，不应将JavaScript代码写在`v-on`指令中，应通过定义方法，并在`v-on`指令中调用方法。




