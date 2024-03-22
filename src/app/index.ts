import Database from "./Database";
import ExpressApp from "./ExpressApp";

class App {
  // Loads your Server
  private static loadServer(): void {
    ExpressApp._init();
  }

  // Loads the Database
  private static async loadDatabase(): Promise<void> {
    await Database.getInstance().connectToDatabase();
    if (Database.getInstance().isConnected) {
      this.loadServer();
    }
  }

  public static async _init(): Promise<void> {
    const dbPromise = this.loadDatabase();
    await dbPromise;
  }
}

export default App;
