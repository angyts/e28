# Word Scramble
Exercise

Your practice exercise this week is to create a game called Word Scramble that meets the specifications described below.

Here's a brief video showing the final game in action... (Links to an external site.)

 

Specifications

On initial page load, the game should ask for the player’s name.



 

Once the player has entered their name, they see a message that says "Game on, [player name!]" followed by the game interface.

The game interface presents the player with a "mystery word" that has had its letters randomly scrambled. E.g. if the mystery word is "football" the player might see "oloalftb" or "llofoabt", etc. 

The player is also given a hint to help them guess the scrambled word. E.g. if the mystery word is "football" the player might see the hint "Play with your hands or feet, depending on your location"

Below the word and hint is input for the user to enter their guess as to what they think the mystery word is.



 

If the player's guess is correct, they see a green feedback box that says "You got it! Nice work", followed by a "Play again" button that resets the game.



 

If their guess is incorrect, they see a red feedback box that says "Sorry, that’s not correct. Please try again."



 

Data

Below is an array of words/hints you can use in your game. Feel free to swap in or add your own word/hints.

words: [
    ['apple', 'Sometimes red, sometimes delicious'],
    ['washington', 'Rushmore’s left edge'],
    ['pumpkin', 'Halloween’s favorite fruit'],
    ['football', 'Play with your hands or feet, depending on your location']
]

Misc. requirements

The scrambled word should be displayed using a computed property.
The feedback styling should be altered using class binding via an object.
The "play again" button should reset the interface without refreshing the page.
While the same word can be used twice, it should not be used twice in a row. 
 

Extra challenge

(Optional but suggested)

When the game is loaded, allow the user to choose a category or difficulty level either via a group of radio buttons or a dropdown. This choice should then be used to influence what word/hint is chosen. (This will require expanding the word list so it's organized by category or difficulty level).

 

Share your URLs

As evidence that you have completed this exercise, answer this question with two clickable links: one to your word-scramble code in your e28 repository and one to your working game on production.

Example:

https://github.com/susanBuck/e28/tree/master/word-scramble (Links to an external site.)
http://e28word-scramble.yourdomain.com (Links to an external site.)
Create a post in the forum if you face challenges/questions when completing this exercise.

Building on your Word Scramble exercise from last week, transform your code so that the feedback on the page is built using a component.