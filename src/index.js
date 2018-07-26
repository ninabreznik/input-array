var bel = require('bel')
var csjs = require('csjs-inject')

module.exports = displayAddressInput

function displayAddressInput({name, theme.classes: css}) {
  var input = bel`<input class=${css.inputField} placeholder='0x6e2...'>`
  return bel`
    <div class=${css.inputContainer}>
      <div class=${css.inputTitle}>${name}</div>
      <div class=${css.inputFields}>
        <div class=${css.keyField}><i class="${css.icon} fa fa-key"></i></div>
        ${input}
      </div>
    </div>`
}
