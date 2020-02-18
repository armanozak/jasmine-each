const Decimal = require('decimal.js');

it.each`
  a           | b      | expected
  ${1}        | ${2}   | ${3}
  ${4e6}      | ${7e5} | ${47e5}
  ${Infinity} | ${1}   | ${Infinity}
  ${0.1}      | ${0.2} | ${0.3}
`(
  'should add $a and $b and return $expected',
  ({a, b, expected}) => {
    expect(Decimal.add(a, b).toNumber()).toBe(expected);
  }
);
