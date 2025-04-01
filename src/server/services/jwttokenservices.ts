// src/server/utils/JwtHandler.ts
import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { IJwtHandler } from "./jwthandler";
import { IUserPayload } from "../types";

export class JwtHandler implements IJwtHandler {
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;

  constructor() {
    this.accessTokenSecret = process.env.JWT_ACCESS_SECRET!;
    this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET!;
  }

  jwtGenerator(
    payload: IUserPayload,
    options: Partial<SignOptions> = {},
  ): string {
    return jwt.sign(payload, this.accessTokenSecret, {
      expiresIn: "15m",
      ...options,
    });
  }

  jwtVerifier(
    token: string,
    options: Partial<VerifyOptions> = {},
  ): IUserPayload {
    try {
      return jwt.verify(token, this.accessTokenSecret, options) as IUserPayload;
    } catch (err) {
      throw new Error("Invalid access token");
    }
  }

  jwtRefreshGenerator(
    payload: IUserPayload,
    options: Partial<SignOptions> = {},
  ): string {
    return jwt.sign(payload, this.refreshTokenSecret, {
      expiresIn: "7d",
      ...options,
    });
  }
}
