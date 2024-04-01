# Simple TodoList

This example shows a simple TodoList application written in Vanilla JavaScript and BootStrap 5.
It is based on a youtube tutorial.

In contrast to the code shown in the video, here the items are not addressed via the index but with their own unique ID.
This means that the list does not always have to be rendered completely


## Resources

- https://www.youtube.com/watch?v=9fk-JMjic2M&ab_channel=ByteMyke


## Comments

### Form onsubmit  

```html
<form onsubmit="addTodo(); return false;">
```
Comming from C# I assumed that handlers can only take function as arguments, but that is not true.
It is also valid to pass in regular JavaScript code.
The statement "return false;" causes the document not to be reloaded after submitting the form.

### Array.Map  

How to iterate through an array of objects and get the elements as well as the corresponding index?

```js
m = a.map( (x) => { ... } );
m = a.map( (x, index ) => { ... } );
```

### Remove elements from an array

```js
array.splice (index, count_elements); 
```