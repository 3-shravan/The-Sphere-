import cron from "node-cron";
import ErrorHandler from "../../middlewares/errorHandler.js";
import { User } from "../../models/user/user.model.js";

const removeUnverifiedAccounts = () => {
  cron.schedule("*/30 * * * *", async () => {
    try {
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      await User.deleteMany({
        accountVerified: false,
        createdAt: { $lt: thirtyMinutesAgo },
      });
    } catch (error) {
      return Promise.reject(
        new ErrorHandler(500, `Cron Error: ${error.message}`)
      );
    }
  });
};

export default removeUnverifiedAccounts;
