import { add, addNTimes, addWithCallback, addAfter, addAfterWithCallback } from './index';
import * as utilsLevel1 from '.';

jest.useFakeTimers();

describe('add', () => {
  const testCases = [
    [[1, 2], 3],
    [[2, 5], 7]
  ]
  
  test.each(testCases)('add(%i, %i) is %i', (input, expected) => {
    expect(add(...input)).toBe(expected);
  })
});

describe('addNTimes', () => {
  const testCases = [
    [[1, 2, 20], 60],
    [[2, 5, 7], 49]
  ]
  
  test.each(testCases)('addNTimes with %s returns %i', (input, expected) => {
    expect(addNTimes(...input)).toBe(expected);
  })

  it('addNTimes calls add', () => {
    const addSpy = jest.spyOn(utilsLevel1, 'add');
    const input = [2, 2];
    addNTimes(...input, 3);
    expect(addSpy).toHaveBeenCalledWith(...input);
  });
});

describe('addWithCallback', () => {
  const callback = jest.fn();
  const input = [1, 2];

  it('calls callback with add result', () => {
    addWithCallback(...input, callback);
    expect(callback).toHaveBeenCalledWith(add(...input));
  });

  it('invokes add', () => {
    addWithCallback(...input, callback);
    expect(utilsLevel1.add).toHaveBeenCalledWith(...input);
  });
});

describe('addAfter', () => {
  const time = 30;
  const input = [1, 2];
 
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.runAllTimers();
  });

  it('calls setTimeout', async () => {
    jest.spyOn(global, 'setTimeout'); 
    jest.runAllTimersAsync();
    await addAfter(...input, time);
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), time);
  });

  it('invokes add', async () => {  
    jest.runAllTimersAsync();
    await addAfter(...input, time);
    expect(utilsLevel1.add).toHaveBeenCalledWith(...input);
  });

  it('returns added result', async () => {
    jest.runAllTimersAsync();
    const result = await addAfter(...input, time);
    expect(result).toBe(add(...input));
  });
});

describe('addAfterWithCallback', () => {
  const time = 30;
  const input = [1, 2];
  const callback = jest.fn();
  
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.runAllTimers();
  });
  

  it('calls setTimeout', () => {
    jest.spyOn(global, 'setTimeout');
    addAfterWithCallback(...input, time, callback);
    jest.runAllTimers();
    expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), time);
  });

  it('calls callback with add result', () => {
    addAfterWithCallback(...input, time, callback);
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledWith(add(...input));
  });

  it('invokes add', () => {
    addAfterWithCallback(...input, time, callback);
    jest.runAllTimers();
    expect(utilsLevel1.add).toHaveBeenCalledWith(...input);
  });
});