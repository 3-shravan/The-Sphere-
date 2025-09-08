import deleteExpireTokens from "./jobs/deleteTokens.js";
import removeUnverifiedAccounts from "./jobs/removeUnverifiedAccounts.js";
import removeUnverifiedTokensOTPs from "./jobs/removeUnverifedTokens.js";

const cleanupManager = () => {
  deleteExpireTokens();
  removeUnverifiedAccounts();
  removeUnverifiedTokensOTPs();
};

export default cleanupManager;
