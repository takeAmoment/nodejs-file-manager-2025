import process from 'process'
import { readdir } from 'fs/promises'

import { ARGUMENTS_ERROR, COMMON_ERROR, INVALID_INPUT_ERROR } from "../constants/constants.js"

const createObj = (name, type) => ({
  Name: name,
  Type: type
})

export const printFilesList = async (commandArgs) => {
  if(commandArgs.length > 0) {
    console.error(`${INVALID_INPUT_ERROR} ${ARGUMENTS_ERROR}`)
    return
  }

  try {
    const dirPath = process.cwd()
    const dirsArr = []
    const filesArr = []

    const files = await readdir(dirPath, { withFileTypes: true })
    files.forEach((file) => {
     if(file.isFile()) {
      filesArr.push(createObj(file.name, 'file'))
     }

     if(file.isDirectory()) {
      dirsArr.push(createObj(file.name, 'directory'))
     }
    }) 

    console.table([...dirsArr.sort(), ...filesArr.sort()])
    
  } catch (error) {
    console.error(`${COMMON_ERROR} ${error.message}`)
  }
}