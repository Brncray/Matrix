import express, { Express } from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import routes from "../routes";
import { config } from "dotenv";
import store from "connect-mongo";

config();
require("../strategies/discord");

export function createApp(): Express {
  const app = express();
  // Enable Parsing Middlewhere for requests
  app.use(express.json());
  app.use(express.urlencoded());

  app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  );

  app.use(
    session({
      secret: "EUGHRUEGHURHNQAWPJFJIOEHFG",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000 * 60 * 24 * 7,
      },
      store: store.create({ mongoUrl: process.env.MONGO_URL as string }),
    })
  );

  // Enable Passport
  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/api", routes);
  return app;
}
