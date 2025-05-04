import { copyFile } from './copyFile.js'
import { deleteFile } from './deleteFile.js'

export const moveFile = async (commandArgs) => {
  const isCopyCompleted = await copyFile(commandArgs)
  if(isCopyCompleted) {
    deleteFile(commandArgs.slice(0, 1))
  }
  
}

