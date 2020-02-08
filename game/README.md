# Game for e28 -- Mastermind

I actually miss this game a lot. For starters it is a simple 2 player game where the codebreaker tries to figure out what is actually the code.
Its a shame nowadays I find it hard to even find this in the stores. So I'm going to implement this just for the fun of it.

For the purposes of this exercise, I'm going to make it single player, but extending it to two player for my own kids, shouldn't be that difficult.

## Background research

It has been such a long time since I've played this. I actually need to read this [wikipedia page](https://en.wikipedia.org/wiki/Mastermind_(board_game)) to refresh my memory.
Reference of [something similar](https://www.webgamesonline.com/mastermind/).

- There is a decoding board with a shield with **4** holes.
- There are **6** colors: green, red, yellow, blue, orange, purple
- There is a box of 4 squares where smaller black and white pegs are placed, black is for a correct colour and location, white is for correct colour wrong location.
- There are a total of 12 tries or less if code is broken.
- Traditionally the score is given to the codemaker for every tries the codebreaker makes. But in my game, I will just record the total number of tries made.
 