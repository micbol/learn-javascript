# Simple TodoList

This example shows a simple TodoList application written in Vanilla JavaScript and BootStrap 5.
It is based on a youtube tutorial.

In contrast to the code shown in the video, here the items are not addressed via the index but with their own unique ID.
This means that the list does not always have to be rendered completely


## Resources

- https://www.youtube.com/watch?v=9fk-JMjic2M&ab_channel=ByteMyke
 

## History

- 2024-04-01
  - Initial version
- 2024-04-02: 
  - Using *list-group* for todo items
  - Added *drag-and-drop*
- 2024-04-03:
  - Added buttons to edit todo and mark it completed


## Comments

### Form onsubmit  

```html
<form onsubmit="addTodo(); return false;">
```
Comming from C# I assumed that handlers can only take function as arguments, but that is not true.
It is also valid to pass in regular JavaScript code.
The statement "return false;" causes the document not to be reloaded after submitting the form.

### Iterating an array with array.map()  

How to iterate through an array of objects and get the elements as well as the corresponding index?
An alternative to the for loop is the map() method.

```js
m = a.map( (x) => { ... } );
m = a.map( (x, index ) => { ... } );
```

### Remove elements from an array

With splice() you only need to specify the index and count of items to remove: 
```js
array.splice (index, count_elements); 
```

### Insert element into array at specific index 

Note: 
The splice() method allows to use indices out of the array's boundaries (see the drop(ev) in example).

```js
array.splice (index, 0, new_element); 
```