import os from 'os'

import { INVALID_INPUT_ERROR, ARGUMENTS_ERROR } from '../constants/constants.js'

const osCommands = {
  'EOL': () => {
    console.log(`EOL: ${JSON.stringify(os.EOL)}`)
  },
  'cpus': () => {
    const cpusArr = os.cpus()

    console.log(`Total amount of cpus: ${cpusArr.length}`)
    cpusArr.forEach((item, index) => console.log(`${index + 1} cpu: ${item.model} model; ${item.speed / 1000}GHz`))
  },
  'homedir': () => {
    console.log(`Homedir:`, os.homedir())
  },
  'username': () => {
    console.log(`Username:`, os.userInfo().username)
  },
  'architecture': () => {
    console.log(`Architecture:`, os.arch())
  }
}

export const printOsInfo = (commandArgs) => {
  if (commandArgs.length !== 1 || !commandArgs[0].startsWith('--')) {
    console.error(`${INVALID_INPUT_ERROR} ${ARGUMENTS_ERROR}`)
    return
  }

  const arg = commandArgs[0].replace(/^--/, '')

  if(osCommands.hasOwnProperty(arg)) {
    osCommands[arg]()
  } else {
    console.error(`${INVALID_INPUT_ERROR} ${ARGUMENTS_ERROR}`)
  }

}