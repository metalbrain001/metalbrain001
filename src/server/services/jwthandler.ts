// src/server/types/IJwtHandler.ts
import { SignOptions, VerifyOptions } from "jsonwebtoken";
import { IUserPayload } from "../types";

export interface IJwtHandler {
  jwtGenerator(payload: IUserPayload, options?: Partial<SignOptions>): string;
  jwtVerifier(token: string, options?: Partial<VerifyOptions>): IUserPayload;
  jwtRefreshGenerator(
    payload: IUserPayload,
    options?: Partial<SignOptions>,
  ): string;
}

export default IJwtHandler;
