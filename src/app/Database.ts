import mongoose from "mongoose";
import Logger from "../logger";
import LocalConfig from "../config/LocalConfig";

class Database {
  private static _instance: Database;
  private _isConnected: boolean;
  private _count: number = 0;

  public get isConnected(): boolean {
    return this._isConnected;
  }

  private constructor() {
    Logger.info("Database :: Initializing...");

    if (!LocalConfig.getConfig().MONGO_URI) {
      Logger.error(`MongoDB URI not defined`);
      throw new Error(`MongoDB URI not defined`);
    }

    if (!LocalConfig.getConfig().DB_NAME) {
      Logger.error(`Database name not defined`);
      throw new Error(`Database name not defined`);
    }

    this._isConnected = false;

    Logger.info("Database :: Initialized");
  }

  /**
   * @name getInstance
   * @description Get Database instance.
   * @returns Database
   */
  public static getInstance(): Database {
    if (!this._instance) {
      this._instance = new Database();
    }

    return this._instance;
  }

  /**
   * @name connectToDatabase
   * @description Connect to MongoDB Database
   * @returns Promise<void>
   */
  public async connectToDatabase(): Promise<any> {
    this._count++;

    if (this._count > 1) {
      Logger.info("Database :: Reconnecting...");
    } else {
      Logger.info("Database :: Connecting...");
    }

    const _db = this;

    await mongoose
      .connect(LocalConfig.getConfig().MONGO_URI!, {
        dbName: LocalConfig.getConfig().DB_NAME,
        autoIndex: true,
        socketTimeoutMS: 30000,
        serverSelectionTimeoutMS: 5000,
      })
      .then(function () {
        Logger.info("Database :: Connected @ MongoDB");
        _db._isConnected = true;
      })
      .catch(function (_err: mongoose.Error) {
        Logger.error(`Database :: Error: ${_err.message}`);
        _db._isConnected = false;
        throw _err;
      });
  }
}

export default Database;
