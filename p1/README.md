*Any instructions/notes in italics should be removed from the template before submitting* 

# Project 1
+ By: Paul Ang Teng Soon
+ Production URL: <https://p1.paulang.rocks/>

## Outside resources
I have used the Vue documentation as well as google and the class forum.

[Accessing Child components using a `$ref`](https://vuejs.org/v2/guide/components-edge-cases.html#Accessing-Child-Component-Instances-amp-Child-Elements)

[Array Manipulation in JS](https://stackoverflow.com/questions/9792927/javascript-array-search-and-remove-string)

[Emit Events from child components](https://forum.vuejs.org/t/passing-data-back-to-parent/1201/2)

## Notes for myself
I don't have a way to reset all the colors on all the buttons in each individual component when game resets... I would leave this as a feature...

There is some bug on the game.js line 160, causes a bug at the end game, the function works, just a console log.

Also one of the click handlers probably didn't return true/false at the end of execution causing some bug. I think the error is because the for loop took longer to execute than the rest of the program and the bottom bits ran first.