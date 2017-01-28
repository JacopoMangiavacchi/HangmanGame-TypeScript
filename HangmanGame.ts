enum tryLetterResult {
    invalidSecret,
    invalidWord,
    alreadyTried,
    won,
    lost,
    found,
    notFound,
};

enum loadGameResult {
    invalidJson,
    won,
    lost,
    ok
};

const characterSet = "abcdefghijklmnopqrstuvwxyz";
const secretCharacter = "_";

class HangmanGame {
    maxFail: Number;
    secret: String;
    lettersTried: String;
    failedAttempts: Number;
    singleWord: Boolean;

    get discovered(): String {
        let discovered = "";

        for (let pos in this.secret) {
            let word = this.secret[pos];

            if (word === ' ' || this.searchLetterInString(word, this.lettersTried)) {
                discovered += word
            }
            else {
                discovered += secretCharacter
            }
        }

        return discovered;
    };

    constructor(secret?: String, singleWord:Boolean = true, maxFail: Number = 7) {
        this.maxFail = maxFail;
        this.lettersTried = "";
        this.failedAttempts = 0;

        if (secret) {
            this.secret = this.clearPhrase(secret);
            this.singleWord = true;
            if (this.secret.indexOf(' ') >= 0) {
                this.singleWord = false;
            }
        }
        else {
            this.singleWord = singleWord;
            this.secret = this.getSecret(singleWord)
        }
    };

    private searchLetterInString(letter: string, string: String): Boolean {
        return string.indexOf(letter) >= 0 ? true : false
    }

    private clearPhrase(secret:String):String {
        return secret.toLowerCase().replace(/[^a-z ]/g, "").replace(/\s+/g, ' ')
    }

    private getSecret(singleWorld: Boolean):String {
        return this.clearPhrase(singleWorld ? "computer" : "it is used for programming")
    }
}



let game = new HangmanGame("This  is My computer!");
console.log(game.secret)
console.log(game.singleWord)
console.log(game.discovered)


