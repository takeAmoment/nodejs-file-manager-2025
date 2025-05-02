import { platform } from 'os'
import process from 'process'

import { WINDOWS_PLATFORM } from '../constants/constants.js'

const getRootDir = () => {
  const isWindows = platform() === WINDOWS_PLATFORM
  // for windows "C:\" for macOs "/"
  return isWindows ? `${process.cwd().charAt(0)}:\\` : '/'
}

export const goUpper = () => {
  const rootDir = getRootDir()
  const currentDir = process.cwd()

  if(rootDir !== currentDir) {
    process.chdir('..')
  }
}