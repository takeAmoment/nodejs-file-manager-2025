import process from 'process'
import { rename } from 'fs/promises'
import { dirname } from 'path'

import { resolvePathToDir } from '../utils/resolvePathToDir.js'
import { checkIsExistingFile } from '../utils/checkIsExistingFile.js'
import { COMMON_ERROR, INVALID_INPUT_ERROR } from '../constants/constants.js'

export const renameFile = async (commandArgs) => {
  if (commandArgs.length !== 2) {
    console.error(`${INVALID_INPUT_ERROR} ${ARGUMENTS_ERROR}`)
    return
  }

  const [sourceFile, newFileName] = commandArgs
  const currentDir = process.cwd()
  const sourceFilePath = resolvePathToDir(currentDir, sourceFile)
  const destinationFilePath = resolvePathToDir(
    dirname(sourceFilePath),
    newFileName
  )

  try {
    const isSourceExists = await checkIsExistingFile(sourceFilePath)
    if (!isSourceExists) throw new Error('Source file does not exist.')

    const isDestExists = await checkIsExistingFile(destinationFilePath)
    if (isDestExists) throw new Error('File with the new name already exists.')

    await rename(sourceFilePath, destinationFilePath)
  } catch (error) {
    console.error(`${COMMON_ERROR} ${error.message}`)
  }
}

