const pass = document.querySelector('.pass')
const range = document.querySelector('.range')
const lengthNumber = document.querySelector('.length')
const checkboxes = document.querySelectorAll('.checkboxes')
const upper = document.querySelector('.upper')
const lower = document.querySelector('.lower')
const numbers = document.querySelector('.numbers')
const symbols = document.querySelector('.symbols')
const statusStrength = document.querySelector('.statusStrength')
const lamps = document.querySelectorAll('.lamps>span')
let statusText = ['Error', 'BAD', 'WEAK', 'MEDIUM', 'GOOD', 'GREAT']

range.addEventListener('input', function () {
  lengthNumber.innerHTML = range.value
  strength()
})

checkboxes.forEach((che) => {
  che.children[0].addEventListener('click', function () {
    this.parentElement.click()
  })
  che.addEventListener('click', function () {
    if (che.children[0].checked) {
      che.children[0].checked = false
    } else {
      che.children[0].checked = true
    }
    if (upper.checked === false && lower.checked === false && numbers.checked === false && symbols.checked === false) {
      lower.checked = true
    }
    strength()
  })
})

function strength() {
  var star = 0
  range.value >= 12 ? star++ : false
  upper.checked ? star++ : false
  lower.checked ? star++ : false
  numbers.checked ? star++ : false
  symbols.checked ? star++ : false
  statusStrength.innerHTML = statusText[star]

  lamps.forEach((span) => {
    span.classList.value = ''
  })
  for (i = 0; i < star; i++) {
    lamps[i].classList.add(statusText[star])
  }
}

function passGenerate() {
  let all = '', password = '', word
  numbers.checked ? all += '0123456789' : false
  symbols.checked ? all += `"!@#$%^&*()-_+?{}[]'` : false
  upper.checked ? all += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : false
  lower.checked ? all += 'abcdefghijklmnopqrstuvwxyz' : false

  if (all.length < range.value) {
    range.value = all.length
    lengthNumber.innerHTML = all.length
    strength()
  }

  while (password.length < range.value) {
    word = all[Math.floor(Math.random() * all.length)]
    password.indexOf(word) === -1 ? password += word : false
  }
  pass.innerHTML = password
}

function copy() {
  navigator.clipboard.writeText(pass.innerText)
}

strength()
passGenerate()