import cron from "node-cron";
import ErrorHandler from "../../middlewares/errorHandler.js";
import { ExpiredToken } from "../../models/jwtToken.model.js";

const deleteExpireTokens = () => {
  // runs every day at midnight
  cron.schedule("0 0 * * *", async () => {
    try {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

      await ExpiredToken.deleteMany({
        createdAt: { $lt: thirtyDaysAgo },
      });
    } catch (error) {
      return Promise.reject(
        new ErrorHandler(500, `Cron Error: ${error.message}`)
      );
    }
  });
};

export default deleteExpireTokens;
