import { mkdir } from 'fs/promises'

import { COMMON_ERROR } from '../constants/constants.js'
import { resolvePathToDir } from '../utils/resolvePathToDir.js'

export const makeDir = async(commandArgs) => {
  if (commandArgs.length !== 1) {
    console.error(`${INVALID_INPUT_ERROR} ${ARGUMENTS_ERROR}`)
    return
  }

  const fileName = commandArgs[0]
  const currentDir = process.cwd()
  const dirPath = resolvePathToDir(currentDir, fileName)

  try {
    await mkdir(dirPath) 
  } catch (error) {
    console.error(`${COMMON_ERROR} ${error.message}`)
  }
}