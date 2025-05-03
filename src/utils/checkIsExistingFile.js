import { access, constants } from 'fs/promises'

export const checkIsExistingFile = async (filePath) => {
  try {
    await access(filePath, constants.F_OK)
    return true
  } catch (error) {
    return false
  }
}