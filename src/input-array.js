const bel = require('bel')
const csjs = require('csjs-inject')
const inputAddress = require("input-address")
const inputInteger = require("input-integer")
const inputBoolean = require("input-boolean")
const inputString = require("input-string")
const validator = require('solidity-validator')

module.exports = displayArrayInput

function displayArrayInput ({ theme: { classes: css, colors }, type, cb }) {
  const container = bel`<div class=${css.arrayContainer}></div>`
  const arr = getParsedArray(type) // uint8[2][3][] returns  ['', 3, 2]
  next({ container, arr, cb })
  return container
  function next ({ container, arr, cb }) {
    var len = arr.shift()
    if (len === '') {
      len = 1
      container.appendChild(plusMinus({ container, arr, cb }))
    }
    for (var i = 0; i < len; i++) append({ container, arr: [...arr], cb })
  }
  function append ({ container, arr, cb }) {
    if (arr.length) { // recursive step
      const innerContainer = bel`<div class="${css.arrayContainer}"></div>`
      container.appendChild(innerContainer)
      next({ container: innerContainer, arr, cb })
    } else { // final step (stop recursion)
      container.appendChild(returnInputFields({ classes: css, colors }, type, cb))
    }
  }
  function plusMinus ({ container, arr, cb }) {
    return bel`<div class=${css.arrayPlusMinus}>
        <i class="${css.arrayMinus} fa fa-minus" onclick=${e=>removeLast(container)}></i>
        <i class="${css.arrayPlus} fa fa-plus" onclick=${e=>append({ container, arr: [...arr], cb })}></i>
      </div>`
  }
  function removeLast (node) {
    if (node.children.length > 2) node.removeChild(node.lastChild)
  }
}
function returnInputFields (theme, type, cb) {
  if (type.includes("int")) return inputInteger({ theme, type, cb })
  else if (type.includes("byte")) return inputString({ theme, type, cb })
  else if (type.includes("string")) return inputString({ theme, type, cb })
  else if (type.includes("bool")) return inputBoolean({ theme, type, cb })
  else if (type.includes("fixed")) return inputInteger({ theme, type, cb })
  else if (type.includes("address")) return inputAddress({ theme, type, cb })
}
function getParsedArray (type) {
  const arr = []
  const i = type.search(/\[/) // find where array starts (bool[2][])
  const basicType = type.split('[')[0] // split to get basic type (bool, uint8)
  const suffix = type.slice(i) // slice to get the remaining part = suffix ([2][][][])
  suffix.split('][').forEach((x, i)=>{
    if (x.search(/\d/) != -1) { arr.push(x.charAt(x.search(/\d/))) }  // if digit is present, push the digit
    else { arr.push('') } // if no, push empty string
  })
  return arr.reverse()
}
