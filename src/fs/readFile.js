import process from 'process'
import { createReadStream } from 'fs'


import {
  ARGUMENTS_ERROR,
  COMMON_ERROR,
  INVALID_INPUT_ERROR
} from '../constants/constants.js'
import { resolvePathToDir } from '../utils/resolvePathToDir.js'
import { checkIsExistingFile } from '../utils/checkIsExistingFile.js'

export const readFile = async (commandArgs) => {
  if (commandArgs.length !== 1) {
    console.error(`${INVALID_INPUT_ERROR} ${ARGUMENTS_ERROR}`)
    return
  }

  const filePath = commandArgs[0]

  const dirPath = process.cwd()
  const fileFullPath = resolvePathToDir(dirPath, filePath)

  const isExistingFile = await checkIsExistingFile(fileFullPath)

  if (!isExistingFile) {
    console.error(`${INVALID_INPUT_ERROR} File doesn't exist.`)
    return
  }

  const readableStream = createReadStream(fileFullPath, { encoding: 'utf-8' })
  let result = ''

  readableStream.on('data', (data) => {
    result += data
  })

  readableStream.on('end', () => {
    console.log(`File content:\n`, result)
  })

  readableStream.on('error', (error) => {
    console.error(`${COMMON_ERROR} ${error.message}`)
  })
}
