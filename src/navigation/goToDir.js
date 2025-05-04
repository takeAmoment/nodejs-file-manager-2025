import { chdir } from 'process'

import { ARGUMENTS_ERROR, COMMON_ERROR, INVALID_INPUT_ERROR } from "../constants/constants.js"

export const goToDir = (commandArgs) => {
  if(commandArgs.length !== 1) {
    console.error(`${INVALID_INPUT_ERROR} ${ARGUMENTS_ERROR}`)
    return
  }

  try {
    chdir(commandArgs[0])
  } catch (error) {
    console.error(`${COMMON_ERROR} ${error.message}`)
  }
}