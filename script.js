const inputEl = document.querySelector("#password")
const upperCaseCheckEl = document.querySelector("#uppercase-check")
const numberCheckEl = document.querySelector("#number-check")
const symbolCheckEl = document.querySelector("#symbol-check")
const scurityIndicatorBarEl = document.querySelector("#security-indicator-bar")
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
  calculeteQuality()
  calculeteFontSize()
}

function calculeteQuality() {
  const percent = Math.round((passwordLength / 64) * 25 +
    (upperCaseCheckEl.checked ? 15 : 0) +
    (numberCheckEl.checked ? 25 : 0) +
    (symbolCheckEl.checked ? 35 : 0)
  )
  scurityIndicatorBarEl.style.width = `${percent}%`

  if (percent == 100) {
    scurityIndicatorBarEl.classList.remove('safe')
    scurityIndicatorBarEl.classList.remove('warning')
    scurityIndicatorBarEl.classList.remove('critical')
    scurityIndicatorBarEl.classList.add('completed')
  }else if (percent > 69) {
    scurityIndicatorBarEl.classList.add('safe')
    scurityIndicatorBarEl.classList.remove('warning')
    scurityIndicatorBarEl.classList.remove('critical')
    scurityIndicatorBarEl.classList.remove('completed')
  }else if (percent > 45) {
    scurityIndicatorBarEl.classList.remove('safe')
    scurityIndicatorBarEl.classList.add('warning')
    scurityIndicatorBarEl.classList.remove('critical')
    scurityIndicatorBarEl.classList.remove('completed')
  }else {
    scurityIndicatorBarEl.classList.remove('safe')
    scurityIndicatorBarEl.classList.remove('warning')
    scurityIndicatorBarEl.classList.add('critical')
    scurityIndicatorBarEl.classList.remove('completed')
  }
}

function calculeteFontSize() {
  if (passwordLength > 45) {
    inputEl.classList.remove('font-sm')
    inputEl.classList.remove('font-xs')
    inputEl.classList.add('font-xxs')
  }else if (passwordLength > 32) {
    inputEl.classList.remove('font-sm')
    inputEl.classList.remove('font-xxs')
    inputEl.classList.add('font-xs')
  }else if (passwordLength > 22) {
    inputEl.classList.add('font-sm')
    inputEl.classList.remove('font-xs')
    inputEl.classList.remove('font-xxs')
  }else {
    inputEl.classList.remove('font-sm')
    inputEl.classList.remove('font-xs')
    inputEl.classList.remove('font-xxs')
  }
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
document.querySelector("#renew").addEventListener('click', generatePassword)

generatePassword()