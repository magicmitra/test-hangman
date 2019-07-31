const readlineSync = require('readline-sync');
const { stringify, 
        createBlankWordArray, 
        isWordSolved, 
        print, 
        randomlySelectWord,
        askForALetter } = require('./lib');

describe('stringify', () => {
    test('stringify should convert and arbitrary string array into a string', () => {
        const stringArray = ['h', 'e', 'l', 'l'];
        const result = stringify(stringArray);
    
        expect(result).toBe('hell');
    });
    
    test('stringify should maintain case', () => {
        const stringArray = ['H', 'e', 'l', 'l'];
        const result = stringify(stringArray);
    
        expect(result).toBe('Hell');
    });
    
    test('stringify should maintain whitespace', () => {
        const stringArray = 'Hello World'.split();
        const result = stringify(stringArray);
    
        expect(result).toBe('Hello World');
    });
    
    test('stringify should return empty string when given and empty array', () => {
        expect(stringify([])).toBe('');
    });
    
    test('stringify should properfly handle array entries with multiple characters', () => {
        const stringArray = ['h', 'e', 'll', 'l'];
        const result = stringify(stringArray);
    
        expect(result).toBe('helll');
    });
});

describe('createBlankWordArray', () => {
    it('should return an array of arbitrary length full of underscores', () => {
        const result = createBlankWordArray(10);
        // test the length
        // test if all underscores
        expect(result.length).toBe(10);
        expect(result).toHaveLength(10); // does the same thing
        expect(result.every(letter => letter === '_')).toBeTruthy();
    });

    it('should return an empty array when passed length of 0', () => {
        expect(createBlankWordArray(0)).toHaveLength(0);
    });

    it('should gracefully handle undefined input', () => {
        const result = createBlankWordArray();
        expect(result).toHaveLength(0);
        expect(result).toEqual([]);
    });

    it('should return empty array on NaN inputs', () => {
        expect(createBlankWordArray({})).toHaveLength(0);
        expect(createBlankWordArray('jk')).toHaveLength(0);
        expect(createBlankWordArray(true)).toHaveLength(0);
    });
});

describe('isWordSolved', () => {
    it('should return false if there is at least one underscore', () => {
        const input = 'a_b'.split('');
        const result = isWordSolved(input);
        expect(result).toBe(false);
        expect(result).toBeFalsy();
        expect(result).not.toBeTruthy();
    });

    it('should return true if there are no underscores', () => {
        const input = 'abc'.split('');
        const result = isWordSolved(input);
        expect(result).toBeTruthy();
    });

    it('should throw a TypeError if passed undefined input', () => {
        expect.assertions(1);
        try {
            isWordSolved();
        } catch(err) {
            expect(err).toBeInstanceOf(TypeError);
        }
        // wrap in a callback and use .toThrow();
        // expect(() => isWordSolved()).toThrow(TypeError);
    });
});

describe('print', () => {
    it('should log the output to the console', () => {
        console.log = jest.fn(); // mock console.log fn
        print('fuck a turd');
        expect(console.log).toBeCalledTimes(1);
        expect(console.log).toBeCalledWith('fuck a turd');
        console.log.mockClear(); // clears mock state
    });

    it('should output an empty string to the console', () => {
        print('');
        expect(console.log).toBeCalledTimes(1);
        expect(console.log).toBeCalledWith('');
    });
});

describe('randomlySelectWord', () => {
    // Math.random = jest.fn(() => 0.5);
    // Math.random = jest.fn().mockReturnValue(0.5);
    Math.random = jest.fn();

    it('should return the any word in the array', () => {
        Math.random
            .mockReturnValueOnce(0)
            .mockReturnValueOnce(0.5)
            .mockReturnValueOnce(0.9);
        const result1 = randomlySelectWord(['1st', '2nd', '3rd']);
        const result2 = randomlySelectWord(['1st', '2nd', '3rd']);
        const result3 = randomlySelectWord(['1st', '2nd', '3rd']);
        expect(result1).toBe('1st');
        expect(result2).toBe('2nd');
        expect(result3).toBe('3rd');
    });
});

jest.mock('readline-sync');
describe('askForALetter', () => {
    it('should return the letter user wrote to their console', () => {
        readlineSync.question.mockReturnValueOnce('a');
        const result = askForALetter();
        expect(result).toBe('a');
    });
});