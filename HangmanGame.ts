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


    tryLetter(letter: String): tryLetterResult {
        if (this.secret.length == 0) {
            return tryLetterResult.invalidSecret;
        }

        if (this.failedAttempts >= this.maxFail) {
            return tryLetterResult.lost;
        }

        let clearLetter = this.clearPhrase(letter);
        
        if (clearLetter.length != 1) {
            return tryLetterResult.invalidWord;
        }

        let clearWord = clearLetter[0];

        if (this.searchLetterInString(clearWord, this.lettersTried)) {
            return tryLetterResult.alreadyTried
        }
        
        this.lettersTried += clearWord;
        
        if (this.searchLetterInString(clearWord, this.secret)) {
            if (this.searchLetterInString(secretCharacter, this.discovered)) {
                return tryLetterResult.found;
            }
            else {
                return tryLetterResult.won;
            }
        }
        
        this.failedAttempts = (Number(this.failedAttempts) + 1);
        
        if (this.failedAttempts >= this.maxFail) {
            return tryLetterResult.lost;
        }
        
        return tryLetterResult.notFound;
    }

   save(): String {
        let gameDictionary = { "maxFail" : this.maxFail,
                               "secret" : this.secret,
                               "lettersTried" : this.lettersTried, 
                               "failedAttempts" : this.failedAttempts };
        
        return JSON.stringify(gameDictionary);
    }
    
    load(json: String): loadGameResult {
        let jsonObject = JSON.parse(json as string);

        this.maxFail = jsonObject["maxFail"];
        this.secret = this.clearPhrase(jsonObject["secret"]);
        this.lettersTried = jsonObject["lettersTried"];
        this.failedAttempts = jsonObject["failedAttempts"];
            
            
        if (this.secret.length == 0) {
            return loadGameResult.invalidJson;
        }
        
        this.singleWord = true;
        if (this.secret.indexOf(' ') >= 0) {
            this.singleWord = false;
        }

        if (this.failedAttempts >= this.maxFail) {
            return loadGameResult.lost;
        }
        
        if (this.searchLetterInString(secretCharacter, this.discovered)) {
            return loadGameResult.ok;
        }
        else {
            return loadGameResult.won;
        }
    }

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

