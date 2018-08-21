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

function displayRightType (theme, type) {
  var css = theme.classes
  var col = theme.colors
  var container = bel`<div class=${css.arrayContainer}></div>`
  var arr = getParsedArray(type) // uint8[2][3][] returns  ['', 3, 2]
  var background = [
    col.white,
    col.turquoise,
    col.lavenderGrey,
    col.violetRed,
    col.aquaMarine
  ]
  var count = 0
  next({ container, arr })
  return container


  function next ({ container, arr }) {
    var len = arr.shift()
    if (len === '') {
      len = 1
      container.appendChild(plusminus({ container, arr }))
    }
    for (var i = 0; i < len; i++) append({ container, arr: [...arr] })
  }

  function append ({ container, arr }) {
    if (arr.length) { // recursive step
      var innerContainer = bel`<div class="${css.arrayContainer}"></div>`
      container.appendChild(innerContainer)
      next({ container: innerContainer, arr })
    } else { // final step (stop recursion)
      container.appendChild(returnInputFields(theme, type))
    }
  }

  function plusminus ({ container, arr }) {
    var css = theme.classes
    return bel`<div class=${css.arrayPlusMinus}>
        <i class="${css.arrayMinus} fa fa-minus" onclick=${e=>removeLast(container)}></i>
        <i class="${css.arrayPlus} fa fa-plus" onclick=${e=>append({ container, arr: [...arr] })}></i>
      </div>`
  }

  function removeLast (node) {
    if (node.children.length > 2) node.removeChild(node.lastChild)
  }

}

function returnInputFields (theme, type) {
  if (type.includes("int")) return inputInteger({ theme, type })
  else if (type.includes("byte")) return inputString({ theme, type })
  else if (type.includes("string")) return inputString({ theme, type })
  else if (type.includes("bool")) return inputBoolean({ theme, type })
  else if (type.includes("fixed")) return inputInteger({ theme, type })
  else if (type.includes("address")) return inputAddress({ theme, type })
}

function getParsedArray (type) {
  var arr = []
  var i = type.search(/\[/) // find where array starts (bool[2][])
  var basicType = type.split('[')[0] // split to get basic type (bool, uint8)
  var suffix = type.slice(i) // slice to get the remaining part = suffix ([2][][][])
  suffix.split('][').forEach((x, i)=>{
    if (x.search(/\d/) != -1) { arr.push(x.charAt(x.search(/\d/))) }  // if digit is present, push the digit
    else { arr.push('') } // if no, push empty string
  })
  arr = arr.reverse()
  return arr
}
