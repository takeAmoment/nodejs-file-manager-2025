import process from 'process'
import { writeFile } from 'fs/promises'

import { resolvePathToDir } from '../utils/resolvePathToDir.js'
import { checkIsExistingFile } from '../utils/checkIsExistingFile.js'
import { COMMON_ERROR } from '../constants/constants.js'

export const addFile = async (commandArgs) => {
  if (commandArgs.length !== 1) {
    console.error(`${INVALID_INPUT_ERROR} ${ARGUMENTS_ERROR}`)
    return
  }

  const fileName = commandArgs[0]
  const currentDir = process.cwd()
  const filePath = resolvePathToDir(currentDir, fileName)

  const isExistingFile = await checkIsExistingFile(filePath)

  if(isExistingFile) {
    console.error(`${INVALID_INPUT_ERROR} Such file already exists.`)
  }

  try {
    await writeFile(filePath, '', { flag: 'wx'})
  } catch (error) {
    console.error(`${COMMON_ERROR} ${error.message}`)
  }
}
