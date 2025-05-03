import { createBrotliDecompress } from 'zlib'

import {
  INVALID_INPUT_ERROR,
  ARGUMENTS_ERROR,
} from '../constants/constants.js'
import { handleZlibCommand } from './handleZlibCommand.js'

export const decompressFile = async (commandArgs) => {
  if (commandArgs.length !== 2) {
    console.error(`${INVALID_INPUT_ERROR} ${ARGUMENTS_ERROR}`)
    return
  }

  const gzip = createBrotliDecompress()
  await handleZlibCommand(commandArgs[0], commandArgs[1], gzip, false)
}