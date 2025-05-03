import process from 'process'
import { createReadStream, createWriteStream } from 'fs'
import { stat } from 'fs/promises'
import { pipeline } from 'stream/promises'
import { basename, join } from 'path'

import { checkIsExistingFile } from '../utils/checkIsExistingFile.js'
import { resolvePathToDir } from '../utils/resolvePathToDir.js'
import { COMMON_ERROR } from '../constants/constants.js'

const checkIsFile = async (filePath) => {
  try {
    const stats = await stat(filePath)
    return stats.isFile()
  } catch (error) {
    return error.code === 'ENOENT'
  }
}


export const handleZlibCommand = async (sourceFile, destinationFile, gzip, isCompressCommand) => {
  const currentDir = process.cwd()
  const sourceFilePath = resolvePathToDir(currentDir, sourceFile)
  const fileName = isCompressCommand ? `${basename(sourceFilePath)}.br` : basename(sourceFilePath).replace(/\.br$/, '') 
  const filePath = (await checkIsFile(destinationFile))
    ? destinationFile
    : join(destinationFile, fileName)
  const destinationFilePath = resolvePathToDir(currentDir, filePath)

  try {
    const isExistingFile = await checkIsExistingFile(sourceFilePath)
    if (!isExistingFile) throw new Error('File does not exist')

    const readableStream = createReadStream(sourceFilePath)
    const writableStream = createWriteStream(destinationFilePath)

    await pipeline(readableStream, gzip, writableStream)
  } catch (error) {
    console.error(`${COMMON_ERROR} ${error.message}`)
  }
}
