import App from "./app";
import Logger from "./logger";

const main = (): void => {
  // Run the Server
  Logger.info("App :: Starting...");

  App._init();
};

/**
 * Booting MainApp
 */
main();
