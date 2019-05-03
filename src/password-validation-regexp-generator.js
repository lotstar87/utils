export class PasswordValidationRegexpGenerator {
  constructor({
    username = '',
    minLength = 4,
    maxLength = null,
    maxCharacterRpeatCount = 1,
    allowedSpecialCharacters = '!@#$%^&*()',
    isUppercaseMandatory = false,
    isLowercaseMandatory = false,
    isDigitMandatory = false,
    usernameChunkCharacterLength = 3
  }) {
    this.options = {
      username,
      minLength,
      maxLength,
      maxCharacterRpeatCount,
      allowedSpecialCharacters,
      isUppercaseMandatory,
      isLowercaseMandatory,
      isDigitMandatory,
      usernameChunkCharacterLength
    }
  }

  static generate({
    username = '',
    minLength = 4,
    maxLength = null,
    maxCharacterRpeatCount = 1,
    allowedSpecialCharacters = '!@#$%^&*()',
    isUppercaseMandatory = false,
    isLowercaseMandatory = false,
    isDigitMandatory = false,
    usernameChunkCharacterLength = 3
  }) {
    var checklist = [
      '^', // from start
      isLowercaseMandatory ? '(?=.*[a-z])' : '', // has at least one lower case character
      isUppercaseMandatory ? '(?=.*[A-Z])' : '', // has at least one upper case character
      isDigitMandatory ? '(?=.*\\d)' : '', // has at least one digit
      `(?=.*[${allowedSpecialCharacters}])`, // has at least one special character
      `(?!.*(.)\\1(?=\\1{${maxCharacterRpeatCount - 1},}))`, // has not an repeated character more than 'maxCharacterRpeatCount -1'
      `.{${minLength},${maxLength}}`, // has a length of 8 and more
      '$' //to the end"
    ]

    if (username.length > 0) {
      var checkSameAsUsernameRegex = `(?!.*${username})` // has not userName => set it by a variable
      var usernameChunks = []

      for (
        var i = 0;
        i <= username.length - usernameChunkCharacterLength;
        i++
      ) {
        var chunk = username.slice(i, i + usernameChunkCharacterLength)
        usernameChunks.push(chunk)
      }

      var usernameChunkChecklist = usernameChunks.map(chunk => `(?!.*${chunk})`)
      checklist.splice(
        -2,
        0,
        checkSameAsUsernameRegex,
        ...usernameChunkChecklist
      )
    }

    // return checklist.join('')
    return new RegExp(checklist.join(''))
  }

  generate() {
    var options = this.options
    return PasswordValidationRegexpGenerator.generate(options)
  }
}
