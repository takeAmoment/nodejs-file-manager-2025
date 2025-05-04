import { argv, stdin, stdout, cwd } from 'process'
import readline from 'readline'
import os from 'os'

import {
  USERNAME_PREFIX,
  USERNAME_ERROR,
  INVALID_INPUT_ERROR
} from './constants/constants.js'
import { showGreeting } from './utils/showGreeting.js'
import { showFarewellPhrase } from './utils/showFarewellPhrase.js'
import { printCurrentWorkingDir } from './utils/printCurrentWrkingDir.js'
import { checkCommand } from './utils/checkCommand.js'

const rl = readline.createInterface({
  input: stdin,
  output: stdout
})

const homeDir = os.homedir()
process.chdir(homeDir)

const handleCommand = (data) => {
  const formatedData = data.toString().trim().replace(/\s+/g, ' ')

  if (formatedData === '.exit') {
    rl.close()
  } else {
    checkCommand(formatedData)
  }
  printCurrentWorkingDir(cwd())
}

const startProgram = () => {
  try {
    const username = argv
      .find((item) => item.startsWith(USERNAME_PREFIX))
      ?.split('=')[1]
      ?.trim()

    if (!username) {
      throw new Error(USERNAME_ERROR)
    }

    const formattedUsername =
      username.slice(0, 1).toUpperCase() + username.slice(1).toLowerCase()
    showGreeting(formattedUsername)

    printCurrentWorkingDir(cwd())

    // listen to command
    rl.on('line', (input) => {
      handleCommand(input, formattedUsername)
    })

    rl.on('close', () => {
      showFarewellPhrase(username)
    })
    
  } catch (error) {
    console.error(`${INVALID_INPUT_ERROR} ${error.message}`)
    rl.close()
  }
}

startProgram()
