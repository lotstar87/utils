export function generatePasswordPatternRegexp(username = '') {
  var checklist = [
    '^', // from start
    '(?=.*[a-z])', // has at least one lower case character
    '(?=.*[A-Z])', // has at least one upper case character
    '(?=.*\\d)', // has at least one digit
    '(?=.*[!@#$%^&*()])', // has at least one special character
    '(?!.*(.)\\1{2,})', // has not an repeated character more than twice
    '.{8,}', // has a length of 8 and more
    '$' //to the end"
  ]

  if (username.length > 0) {
    var checkSameAsUsernameRegex = `(?!.*${username})` // has not userName => set it by a variable
    var usernameChunks = []

    for (var i = 0; i <= username.length - 3; i++) {
      var chunk = username.slice(i, i + 3)
      usernameChunks.push(chunk)
    }

    var usernameChunkChecklist = usernameChunks.map(chunk => `(?!.*${chunk})`)
    checklist.splice(-2, 0, checkSameAsUsernameRegex, ...usernameChunkChecklist)
  }

  // return checklist.join('')
  return new RegExp(checklist.join(''))
}
