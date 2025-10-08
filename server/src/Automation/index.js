import deleteExpireTokens from "./jobs/deleteTokens.js"
import removeUnverifiedTokensOTPs from "./jobs/removeUnverifedTokens.js"
import removeUnverifiedAccounts from "./jobs/removeUnverifiedAccounts.js"

const cleanupManager = () => {
  deleteExpireTokens()
  removeUnverifiedAccounts()
  removeUnverifiedTokensOTPs()
}

export default cleanupManager
