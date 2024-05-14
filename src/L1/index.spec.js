import { addNTimes, addWithCallback, addAfter, addAfterWithCallback } from './index';
import * as utils from './utils/index';

jest.spyOn(utils, 'add');

describe('addNTimes', () => {
  const testCases = [
    [[1, 2, 20], 60],
    [[2, 5, 7], 49]
  ]
  
  test.each(testCases)('addNTimes with %s returns %i', (input, expected) => {
    expect(addNTimes(...input)).toBe(expected);
  })

  it('addNTimes calls add', () => {
    const input = [2, 2];
    addNTimes(...input, 3);
    expect(utils.add).toHaveBeenCalledWith(...input);
  });
});

describe('addWithCallback', () => {
  const callback = jest.fn();
  const input = [1, 2];

  it('calls callback with add result', () => {
    addWithCallback(...input, callback);
    expect(callback).toHaveBeenCalledWith(utils.add(...input));
  });

  it('invokes add', () => {
    addWithCallback(...input, callback);
    expect(utils.add).toHaveBeenCalledWith(...input);
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
    expect(utils.add).toHaveBeenCalledWith(...input);
  });

  it('returns added result', async () => {
    jest.runAllTimersAsync();
    const result = await addAfter(...input, time);
    expect(result).toBe(utils.add(...input));
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
    expect(callback).toHaveBeenCalledWith(utils.add(...input));
  });

  it('invokes add', () => {
    addAfterWithCallback(...input, time, callback);
    jest.runAllTimers();
    expect(utils.add).toHaveBeenCalledWith(...input);
  });
});