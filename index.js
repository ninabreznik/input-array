var bel = require('bel')
var csjs = require('csjs-inject')

var fonts = [
  'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://fonts.googleapis.com/css?family=Overpass+Mono" rel="stylesheet'
]
var fontAwesome = bel`<link href=${fonts[0]} rel='stylesheet' type='text/css'>`
var overpassMono = bel`<link href=${fonts[1]} rel='stylesheet' type='text/css'>`
document.head.appendChild(fontAwesome)
document.head.appendChild(overpassMono)

var colors = {
  white        : '#ffffff',   // borders, font on input background
  whiteSmoke   : '#f1f4f9',   // background
  lavenderGrey : '#e3e8ee',   // inputs background
  slateGrey    : '#8a929b',   // text
  violetRed    : '#e76685',
  aquaMarine   : '#59c4bc',
  turquoise    : '#14b9d5'
}

function displayAddressInput() {
  var input = bel`<input placeholder='0x6e2...'>`
  var el = bel`
    <div class=${css.inputContainer}>
      <div class=${css.inputTitle}>address</div>
      <div class=${css.inputFields}>
        <div class=${css.keyField}><i class="${css.icon} fa fa-key"></i></div>
        ${input}
      </div>
    </div>`

  document.body.appendChild(el)
}

var css = csjs`
   body {
    background-color: ${colors.whiteSmoke};
    font-size: 16px;
  }
  .inputContainer {
    font-family: 'Overpass Mono', monospace;
    margin: 2%;
    display: flex;
    align-items: center;
    font-size: 1em;
    color: ${colors.slateGrey};
    width: 400px;
  }
  .inputFields {
    margin-left: 5%;
    display: flex;
    flex-direction: row;
  }
  .inputTitle {
    font-size: 1.2em;
    font-weight: bold;
    width: 100px;
  }
  .keyField {
    ${inputStyle()}
    border-right: none;
    background-color: ${colors.aquaMarine}
  }
  .icon {
    color: ${colors.white};
  }
  input {
    ${inputStyle()}
    font-size: 1em;
    color: ${colors.slateGrey};
    display: flex;
    align-items: stretch;
  }
  input::placeholder {
    color: ${colors.white};
  }
`

function inputStyle () {
  return `
    border: 3px solid ${colors.white};
    background-color: ${colors.lavenderGrey};
    padding: 5px 10px;
  `
}

displayAddressInput()
