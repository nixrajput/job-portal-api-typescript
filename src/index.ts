import App from "./app";
import Logger from "./logger";

/**
 * Define Main Class
 */
class Main {
  // Run the Server
  public static _runApp(): void {
    Logger.info("App :: Starting...");

    App._init();
  }
}

/**
 * Booting MainApp
 */
Main._runApp();
