import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit("my-limit-key");

    if (!success) {
      return res
        .status(429)
        .json({ Message: "Too many request ,please try again" });
    }

    next();
  } catch (error) {
    console.log("ratelimit error", error);
    next(error);
  }
};

export default rateLimiter;
