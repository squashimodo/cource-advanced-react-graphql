import formatMoney from '../formatMoney';

describe('FormatMoney function', () => {
  it('should work with fractions', () => {
    expect(formatMoney(1)).toEqual('€0.01');
    expect(formatMoney(10)).toEqual('€0.10');
    expect(formatMoney(9)).toEqual('€0.09');
    expect(formatMoney(4)).toEqual('€0.04');
  });

  it('should change the currency if you pass a custom format', () => {
    expect(formatMoney(1, 'USD')).toEqual('$0.01');
  });

  it('leaves cents off for whole dollars', () => {
    expect(formatMoney(5000)).toEqual('€50');
    expect(formatMoney(100)).toEqual('€1');
    expect(formatMoney(50000000)).toEqual('€500,000');
  });

  it('works with whole and fractional moneys', () => {
    expect(formatMoney(5012)).toEqual('€50.12');
    expect(formatMoney(101)).toEqual('€1.01');
  });
});
