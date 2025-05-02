import { goUpper } from "../navigation/goUpper.js"

export const COMMANDS = {
  'up': goUpper
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