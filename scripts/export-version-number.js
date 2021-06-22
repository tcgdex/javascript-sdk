const { version } = require('../package.json')
const fs = require('fs')

fs.writeFileSync('./src/version.json', JSON.stringify({version}))
