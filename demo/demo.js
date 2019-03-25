const csjs = require('csjs-inject')
const inputarray = require('../')

document.body.innerHTML = `<style>
.arrayContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}
.arrayPlusMinus {
  margin: 10px;
}
.arrayPlus {
  cursor: pointer;
}
.arrayMinus {
  cursor: pointer;
}
</style>`

const classes = {
  arrayContainer: 'arrayContainer',
  arrayPlusMinus: 'arrayPlusMinus',
  arrayPlus: 'arrayPlus',
  arrayMinus: 'arrayMinus'
}

const log = document.createElement('pre')
const el = inputarray({ theme: { classes }, type: 'int8', cb: (err, val) => {
  if (err) log.appendChild(document.createTextNode(`${err}\n`))
  else log.appendChild(document.createTextNode(`ok: ${val}\n`))
} })
document.body.appendChild(el)
document.body.appendChild(log)
