import process from 'process'
import { createReadStream } from 'fs'
import { createHash } from 'crypto'

import { ARGUMENTS_ERROR, COMMON_ERROR, INVALID_INPUT_ERROR, MISSING_FILE_ERROR } from "../constants/constants.js"
import { resolvePathToDir } from "../utils/resolvePathToDir.js"
import { checkIsExistingFile } from '../utils/checkIsExistingFile.js'

export const calculateHash = async (commandArgs) => {
  if(commandArgs.length !== 1) {
    console.error(`${INVALID_INPUT_ERROR} ${ARGUMENTS_ERROR}`)
    return
  }

  const currentDir = process.cwd()
  const filePath = resolvePathToDir(currentDir, commandArgs[0])

  try {
    const isExistingFile = await checkIsExistingFile(filePath)
    if(!isExistingFile) throw new Error(MISSING_FILE_ERROR)

    const readableStream = createReadStream(filePath)
    const hash = createHash('sha256')

    readableStream.on('data', (data) => hash.update(data))
    readableStream.on('end', () => {
      console.log(`Hash:`, hash.digest('hex'))
    })
    readableStream.on('error', (err) => {
      console.error(`${COMMON_ERROR} ${err.message}`)
    })
    
  } catch (error) {
    console.error(`${COMMON_ERROR} ${error.message}`)
  }
}