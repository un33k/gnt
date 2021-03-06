const dl = require('.')

test('should throw errors for invalid inputs', () => {
  expect(() => dl._scalarConfig.parseValue(null)).toThrow()
  expect(() => dl._scalarConfig.parseValue({})).toThrow()
  expect(() => dl._scalarConfig.parseValue({ state: 'MN' })).toThrow()
  expect(() => dl._scalarConfig.parseValue({ state: 'XZ', license: '12345' })).toThrow()
  expect(() => dl._scalarConfig.parseValue({ license: '12345' })).toThrow()
})

const SUCCESS_CASES = [
  ['AL', '1234567'],
  ['AK', '1234567'],
  ['AZ', 'A234567'],
  ['AR', '12345'],
  ['CA', 'B1234567'],
  ['CO', 'AB34567'],
  ['DE', '1234567'],
  ['FL', 'A123451234512'],
  ['GA', '123456789'],
  ['HI', 'C12345678'],
  ['ID', 'AB123456C'],
  ['IL', 'B11111111111'],
  ['IN', 'A123456789'],
  ['IA', '123AB4567'],
  ['KS', 'A1B2C'],
  ['KY', 'A12345678'],
  ['LA', '12345'],
  ['ME', '12345678'],
  ['MD', 'B123456789101'],
  ['MA', 'B12345678'],
  ['MI', 'B1234567890'],
  ['MN', 'J123456789010'],
  ['MS', '123456789'],
  ['MO', 'A123456R'],
  ['MT', '1234567890123'],
  ['NE', 'A123456'],
  ['NV', 'X12345678'],
  ['NH', '12ABC12345'],
  ['NJ', 'A12345678901234'],
  ['NM', '12345678'],
  ['NY', '12345678'],
  ['NC', '123'],
  ['ND', '123456789'],
  ['OH', '12345678'],
  ['OK', 'A123456789'],
  ['OR', '1'], // Technically okay!
  ['PA', '12345678'],
  ['RI', 'C123456'],
  ['SC', '12345'],
  ['SD', '123451234512'],
  ['TN', '1234567'],
  ['TX', '12345678'],
  ['UT', '4444'],
  ['VT', '1234567A'],
  ['VA', '123456789'],
  ['WA', '123***abc***'],
  ['WV', 'ab12345'],
  ['WI', 'A1234567891012'],
  ['WY', '1234567890'],
]

SUCCESS_CASES.forEach(([state, license]) => {
  test(`state: ${state}, license: ${license} should pass`, () => {
    expect(dl._scalarConfig.parseValue({ state, license }))
      .toEqual({ state, license })
  })
})

const FAILURE_CASES = [
  ['AL', '12345678'],
  ['AK', '12345678'],
  ['AZ', ''],
  ['AR', '123'],
  ['CA', 'B123456'],
  ['CO', 'ABCD567'],
  ['DE', '12345678'],
  ['FL', 'A12345123451234567'],
  ['GA', '1234'],
  ['HI', 'C12345'],
  ['ID', '1289'],
  ['IL', 'B1111111'],
  ['IN', 'AB123456789'],
  ['IA', '1234'],
  ['KS', 'A1B2CB'],
  ['KY', 'A12345'],
  ['LA', '1234567890'],
  ['ME', '1234567AB'],
  ['MD', 'B123456'],
  ['MA', 'B12378'],
  ['MI', 'B12345'],
  ['MN', 'J12345678901033409823'],
  ['MS', '12345678'],
  ['MO', 'A123456S'],
  ['MT', '1234567890123456'],
  ['NE', 'A123456789'],
  ['NV', 'Y12345678'],
  ['NH', '12ABC1234'],
  ['NJ', 'A123456789012'],
  ['NM', '1234567'],
  ['NY', 'AB'],
  ['NC', 'ABCD'],
  ['ND', '1234567890'],
  ['OH', 'B123'],
  ['OK', 'A1234567'],
  ['OR', 'B123'], // Technically okay!
  ['PA', '1234567'],
  ['RI', 'C12345'],
  ['SC', '1234'],
  ['SD', '123'],
  ['TN', '12345'],
  ['TX', '123456789'],
  ['UT', '444'],
  ['VT', '1234567B'],
  ['VA', '1234567890'],
  ['WA', '123***abc**'],
  ['WV', 'ab1234'],
  ['WI', 'A123456789101234'],
  ['WY', '12345678'],
]
FAILURE_CASES.forEach(([state, license]) => {
  test(`state: ${state}, license: ${license} should fail`, () => {
    expect(() => dl._scalarConfig.parseValue({ state, license })).toThrow()
  })
})
