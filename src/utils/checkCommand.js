import { goToDir } from "../navigation/goToDir.js"
import { goUpper } from "../navigation/goUpper.js"
import { printFilesList } from "../navigation/printFilesList.js"
import { readFile } from '../fs/readFile.js'
import { addFile } from "../fs/addFile.js"
import { makeDir } from "../fs/makeDir.js"
import { renameFile } from "../fs/renameFile.js"
import { copyFile } from "../fs/copyFile.js"
import { deleteFile } from "../fs/deleteFile.js"
import { moveFile } from "../fs/moveFile.js"

export const COMMANDS = {
  'up': goUpper,
  'cd': goToDir,
  'ls': printFilesList,
  'cat': readFile,
  'add': addFile,
  'mkdir': makeDir,
  'rn': renameFile,
  'cp': copyFile.apply,
  'rm': deleteFile,
  'mv': moveFile
}

const parseCommand = (data) => {
  const dataArr = data.split(' ')
  const command = dataArr[0]
  const commandArgs = [...dataArr].slice(1)

  return { command, commandArgs}
}

export const checkCommand = (data) => {
  const { command, commandArgs } = parseCommand(data)
  console.log('Command', command, commandArgs)

  if(COMMANDS.hasOwnProperty(command)) {
    COMMANDS[command](commandArgs)
  } else {
    console.error('Invalid input.')
  }

}