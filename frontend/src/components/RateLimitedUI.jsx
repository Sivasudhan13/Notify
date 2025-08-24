import { Zap } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div
        className="border rounded-lg shadow-md"
        style={{ backgroundColor: "#9d31f1", borderColor: "#f9f2ff" }}
      >
        <div className="flex flex-col md:flex-row items-center p-6">
          <div
            className="flex-shrink-0 p-4 rounded-full mb-4 md:mb-0 md:mr-6"
            style={{ backgroundColor: "#9d31f1" }}
          >
            <Zap className="size-10" style={{ color: "#f9f2ff" }} />
          </div>
          <div
            className="flex-1 text-center md:text-left"
            style={{ color: "#f9f2ff" }}
          >
            <h3 className="text-xl font-bold mb-2">Rate Limit Reached</h3>
            <p className="mb-1">
              You've made too many requests in a short period. Please wait a
              moment.
            </p>
            <p className="text-sm">
              Try again in a few seconds for the best experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;
