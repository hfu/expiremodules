const config = require('config')
const fs = require('fs')
const path = require('path')
const readline = require('readline')

const date0 = process.argv[2] ? parseInt(process.argv[2]) : 0
const dir = path.resolve(__dirname, config.get('dir'))

let list = {}
let Z = config.get('Z')
let count = 0

const show = () => {
  let keys = Object.keys(list).sort((a, b) => {
    return list[b] - list[a]
  })
  console.log(`${count} expiretiles: ${Object.keys(list).length} expiremodules`)
  for (let key of keys) {
    console.log(`  ${key}: ${list[key]}`)
  }
}

for (let date of fs.readdirSync(dir)) {
  date = parseInt(date)
  if (date < date0) continue
  console.log(`collecting modules from ${date}...`)
  const dateDir = path.resolve(dir, date.toString())
  for (let file of fs.readdirSync(dateDir)) {
    const filePath = path.resolve(dateDir, file)
    console.log(`${filePath}`) 
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath)
    })
    rl.on('line', line => {
      let [z, x, y] = line.split('/').map(v => parseInt(v))
      x = x >> (z - Z)
      y = y >> (z - Z)
      z = Z
      const w3n = `${z}-${x}-${y}`
      list[w3n] = list[w3n] ? list[w3n] + 1 : 1
      count++
      if (count % 100000 === 0) show() 
    })
    rl.on('close', () => {
      show()
    })
  }
}
