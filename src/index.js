import { argv, exit } from 'process'

import { USERNAME_PREFIX, USERNAME_ERROR, COMMON_ERROR } from './constants/constants.js'
import { showGreeting } from './utils/showGreeting.js'

const startProgram = () => {
  try {
    const username = argv.find(item => item.startsWith(USERNAME_PREFIX))?.split('=')[1]?.trim()

    if(!username) {
      throw new Error(USERNAME_ERROR)
    }

    const formattedUsername = username.slice(0, 1).toUpperCase() + username.slice(1).toLowerCase()
    showGreeting(formattedUsername)
    
  } catch (error) {
    throw new Error(`${COMMON_ERROR} Detailed info: ${error.message}`)
  }
}

startProgram()