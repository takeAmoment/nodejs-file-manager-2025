import { copyFile } from './copyFile.js'
import { deleteFile } from './deleteFile.js'

export const moveFile = async (commandArgs) => {
  const [sourcePath] = commandArgs

  await copyFile(commandArgs)
  deleteFile([sourcePath])
}
