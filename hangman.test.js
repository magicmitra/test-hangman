const hangman = require('./hangman');

describe('playHangman', () => {
    console.log = jest.fn();
    const hangmanSpy = jest.spyOn(hangman, 'playHangman');
    afterEach(() => {
        // resets our mocks after each test
        console.log.mockClear();
        hangmanSpy.mockClear();
    });
    it('should print success message and end when a correct word has been passed', () => {
        const targetWord = 'abc';
        const guessWord = 'abc'.split('');

        hangman.playHangman(targetWord, guessWord);
        expect(console.log).toBeCalledTimes(1);
        expect(console.log).toBeCalledWith(`You win! The word was ${targetWord}`);
        expect(hangmanSpy).toBeCalledTimes(1);
    });

    it('should print a failure message and end when you have ran out of strikes', () => {
        const targetWord = 'abc';
        const guessWord = 'a_c'.split('');
        const maxStrikes = 5;
        hangman.playHangman(targetWord, guessWord, maxStrikes, maxStrikes);
        expect(console.log).toBeCalledTimes(1);
        expect(console.log).toBeCalledWith(`You lose! The word was ${targetWord}`);
        expect(hangmanSpy).toBeCalledTimes(1);
    });

    it.todo('should continue play if no win or lose');

});