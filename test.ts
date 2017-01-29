import {HangmanGame} from "./HangmanGame";

let game = new HangmanGame("This  is My computer!");
console.log(game.tryLetter("i"))
console.log(game.tryLetter("x"))
console.log(game.tryLetter("y"))
console.log(game.secret)
console.log(game.singleWord)
console.log(game.discovered)
let json = game.save()
console.log(json)
game = new HangmanGame()
game.load(json)
console.log(game.tryLetter("m"))
console.log(game.secret)
console.log(game.singleWord)
console.log(game.discovered)
console.log(game.tryLetter("t"))
console.log(game.tryLetter("h"))
console.log(game.tryLetter("s"))
console.log(game.tryLetter("y"))
console.log(game.tryLetter("c"))
console.log(game.tryLetter("m"))
console.log(game.discovered)
console.log(game.tryLetter("o"))
console.log(game.tryLetter("sd"))
console.log(game.tryLetter("p"))
console.log(game.tryLetter("u"))
console.log(game.tryLetter("r"))
console.log(game.discovered)
console.log(game.failedAttempts)
console.log(game.tryLetter(" "))
console.log(game.tryLetter("j"))
console.log(game.discovered)
console.log(game.failedAttempts)
console.log(game.tryLetter("e"))