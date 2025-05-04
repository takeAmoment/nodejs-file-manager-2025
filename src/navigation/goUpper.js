import { platform } from 'os'
import process from 'process'

import { ARGUMENTS_ERROR, INVALID_INPUT_ERROR, WINDOWS_PLATFORM } from '../constants/constants.js'

const getRootDir = () => {
  const isWindows = platform() === WINDOWS_PLATFORM
  // for windows "C:\" for macOs "/"
  return isWindows ? `${process.cwd().charAt(0)}:\\` : '/'
}

export const goUpper = (commandArgs) => {
  if(commandArgs.length > 0) {
    console.error(`${INVALID_INPUT_ERROR} ${ARGUMENTS_ERROR}`)
    return
  }

  const rootDir = getRootDir()
  const currentDir = process.cwd()

  if(rootDir !== currentDir) {
    process.chdir('..')
  }
}