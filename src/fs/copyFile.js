import process from 'process'
import { basename, join } from 'path'
import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream/promises'

import { COMMON_ERROR, INVALID_INPUT_ERROR, ARGUMENTS_ERROR } from '../constants/constants.js'
import { resolvePathToDir } from '../utils/resolvePathToDir.js'
import { checkIsExistingFile } from '../utils/checkIsExistingFile.js'

export const copyFile = async (commandArgs) => {
  if (commandArgs.length !== 2) {
    console.error(`${INVALID_INPUT_ERROR} ${ARGUMENTS_ERROR}`)
    return
  }

  const [filePath, newFilePath] = commandArgs
  const currentDir = process.cwd()
  const fileName = basename(filePath)
  const sourceFilePath = resolvePathToDir(currentDir, filePath)
  const destinationFilePath = resolvePathToDir(
    currentDir,
    join(newFilePath, fileName)
  )

  try {
    const isSourceExists = await checkIsExistingFile(sourceFilePath)
    if (!isSourceExists) throw new Error('Source file does not exist.')

    const isDestExists = await checkIsExistingFile(destinationFilePath)
    if (isDestExists) throw new Error('File in new path already exists.')

    const readableStream = createReadStream(sourceFilePath)
    const writableStream = createWriteStream(destinationFilePath)

    await pipeline(readableStream, writableStream)
    return true
  } catch (error) {
    console.error(`${COMMON_ERROR} ${error.message}`)
    return false
  }
}

