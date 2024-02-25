import passport, { Profile } from "passport";
import { Strategy } from "passport-discord";
import { VerifyCallback } from "passport-oauth2";
import { User } from "../database/schemas";

passport.serializeUser((user: any, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id); 
    return user ? done(null, user) : done(null, null);
   } catch (error) {
    console.error(error);
    return done(error, null); 
  }
});

passport.use(
  new Strategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      callbackURL: process.env.DISCORD_REDIRECT_URL,
      scope: ["identify", "email", "guilds"],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const { id: discordId } = profile;
        const existingUser = await User.findOneAndUpdate(
          { discordId: profile.id },
          { accessToken, refreshToken },
          { new: true }
        );
        if (existingUser) return done(null, existingUser);
        const newUser = new User({
          discordId,
          accessToken,
          refreshToken,
        });
        const savedUser = await newUser.save();
        return done(null, savedUser);
      } catch (error) {
        console.error(error);
        return done(error as any, undefined);
      }
    }
  )
);
