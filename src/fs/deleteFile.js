import process from 'process'
import { rm } from 'fs/promises'

import { resolvePathToDir } from '../utils/resolvePathToDir.js'
import { checkIsExistingFile } from '../utils/checkIsExistingFile.js'
import { COMMON_ERROR, INVALID_INPUT_ERROR, ARGUMENTS_ERROR, MISSING_FILE_ERROR } from '../constants/constants.js'

export const deleteFile = async (commandArgs) => {
  if (commandArgs.length !== 1) {
    console.error(`${INVALID_INPUT_ERROR} ${ARGUMENTS_ERROR}`)
    return
  }

  const currentDir = process.cwd()
  const filePath = resolvePathToDir(currentDir, commandArgs[0])

  try {
    const isExistingFile = await checkIsExistingFile(filePath)
    if (!isExistingFile) throw new Error(MISSING_FILE_ERROR)

    await rm(filePath)
  } catch (error) {
    console.error(`${COMMON_ERROR} ${error.message}`)
  }
}

