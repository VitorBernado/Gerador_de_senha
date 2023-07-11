const inputEl = document.querySelector("#password")
const upperCaseCheckEl = document.querySelector("#uppercase-check")
const numberCheckEl = document.querySelector("#number-check")
const symbolCheckEl = document.querySelector("#symbol-check")

let passwordLength = 16

function generatePassword() {
  let chars = "abcdefghjkmnpqrstuvwxyz"

  const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
  const numberChars = "123456789"
  const symbolChars = "?!@&*()[]"

  if (upperCaseCheckEl.checked) {
    chars += upperCaseChars
  }

  if (numberCheckEl.checked) {
    chars += numberChars
  }

  if (symbolCheckEl.checked) {
    chars += symbolChars
  }

  let password = ""

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length)
    password += chars.substring(randomNumber, randomNumber + 1)
  }

  inputEl.value = password
}

function copy() {
  navigator.clipboard.writeText(inputEl.value)
}

const passwordLengthEl = document.querySelector("#password-length")
passwordLengthEl.addEventListener('input', function() {
  passwordLength = passwordLengthEl.value
  document.querySelector("#password-length-text").innerText = passwordLength
  generatePassword()
})

upperCaseCheckEl.addEventListener('click', generatePassword)
numberCheckEl.addEventListener('click', generatePassword)
symbolCheckEl.addEventListener('click', generatePassword)

document.querySelector("#copy-1").addEventListener('click', copy)
document.querySelector("#copy-2").addEventListener('click', copy)

generatePassword()