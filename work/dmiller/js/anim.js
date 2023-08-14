/* Random Background Color  */
// â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”
// Random
// â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”
/* helper functions */
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
/* Configuration */
const rndInt = randomIntFromInterval(1, 3)
/* Add random style<n> */
document.getElementById('Body').className = "style"+rndInt;




/* Scramble Text */
// â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”
// TextScramble
// â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}â€”=+*^?#________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

// â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”
// Example
// â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”

const phrases = [
  'HI!',
  'HOI!',
  'COUCOU!',
  'CIAO!',
  'HOLA!'
]
const phrases2 = [
  'BERN',
  'THE SWISS CAPITAL',
  'THE CITY OF BEARS'
]
const phrases3 = [
  'MINIMAL',
  'BEAUTIFUL',
  'EXCEPTIONAL',
  'SURPRISING'
]
const phrases4 = [
  'DECENT',
  'AMAZING',
  'MINDBLOWING',
  'BRAND NEW'
]
const phrases5 = [
  'HELLO@LEKOLLEKTIV.CH',
  'WRITE US YOUR IDEA',
  'LET\'S GET IN TOUCH'
]


const scramble1 = new TextScramble(document.querySelector('.scramble1'))
const scramble2 = new TextScramble(document.querySelector('.scramble2'))
const scramble3 = new TextScramble(document.querySelector('.scramble3'))
const scramble4 = new TextScramble(document.querySelector('.scramble4'))
const scramble5 = new TextScramble(document.querySelector('.scramble5'))


let counter = 0
let counter2 = 0
let counter3 = 0
let counter4 = 0
let counter5 = 0

const next = () => {
  scramble1.setText(phrases[counter]).then(() => {
    setTimeout(next, 2200)
  })
  counter = (counter + 1) % phrases.length
}  
const next2 = () => {  
  scramble2.setText(phrases2[counter2]).then(() => {
    setTimeout(next2, 2200)
  })
  counter2 = (counter2 + 1) % phrases2.length
}
const next3 = () => {  
  scramble3.setText(phrases3[counter3]).then(() => {
    setTimeout(next3, 2200)
  })
  counter3 = (counter3 + 1) % phrases3.length
}
const next4 = () => {  
  scramble4.setText(phrases4[counter4]).then(() => {
    setTimeout(next4, 2200)
  })
  counter4 = (counter4 + 1) % phrases4.length
}
const next5 = () => {  
  scramble5.setText(phrases5[counter5]).then(() => {
    setTimeout(next5, 2200)
  })
  counter5 = (counter5 + 1) % phrases5.length
}

next();
next2();
next3();
next4();
next5();
