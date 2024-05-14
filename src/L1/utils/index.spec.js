describe('add', () => {
  const testCases = [
    [[1, 2], 3],
    [[2, 5], 7]
  ]
  
  test.each(testCases)('add(%i, %i) is %i', (input, expected) => {
    expect(add(...input)).toBe(expected);
  })
});
