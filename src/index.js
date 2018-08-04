var bel = require('bel')
var csjs = require('csjs-inject')
var inputAddress = require("input-address")
var inputInteger = require("input-integer")
var inputBoolean = require("input-boolean")
var inputString = require("input-string")


module.exports = displayArrayInput

function displayArrayInput({theme, type}) {
  var css = theme.classes
  return bel`${displayRightType(theme, type)}`
}

// @TODO Add logic for pairs etc. of arrays (int8[2][]), now only logic for arryas of single values

function displayRightType (theme, type) {
  var css = theme.classes
  var inputField
  if (type.includes("int")) {
    return bel`<div class=${css.arrayContainer}>${iconsPlusMinus(theme, type)} ${inputInteger({ theme })}</div>`
  }
  if (type.includes("byte")) {
    return bel`<div class=${css.arrayContainer}>${iconsPlusMinus(theme, type)} ${inputString({ theme })}</div>`
  }
  if (type.includes("bool")) {
    return bel`<div class=${css.arrayContainer}> ${iconsPlusMinus(theme, type)} ${inputBoolean({ theme })}</div>`
  }
  if (type.includes("uint")) {
    return bel`<div class=${css.arrayContainer}>${iconsPlusMinus(theme, type)} ${inputInteger({ theme })}</div>`
  }
  if (type.includes("address")) {
    return bel`<div class=${css.arrayContainer}>${iconsPlusMinus(theme, type)} ${inputAddress({ theme })}</div>`
  }
}

function iconsPlusMinus (theme, type) {
  var css = theme.classes
  return bel`<div>
      <i class="${css.arrayMinus} fa fa-minus" onclick=${e=>removeLast(e)}></i>
      <i class="${css.arrayPlus} fa fa-plus" onclick=${e=>addNew({ e, type, theme })}></i>
    </div>`
}


function removeLast (e) {
  var node = e.target.parentNode.parentNode
  if (node.children.length > 2) node.removeChild(node.lastChild)
}

function addNew ({ e, type, theme }) {
  var node = e.target.parentNode.parentNode
  if (type.includes("int")) node.appendChild(inputInteger({ theme }))
  if (type.includes("byte")) node.appendChild(inputString({ theme }))
  if (type.includes("bool")) node.appendChild(inputBoolean({ theme }))
  if (type.includes("uint")) node.appendChild(inputInteger({ theme }))
  if (type.includes("address")) node.appendChild(inputAddress({ theme }))
}
