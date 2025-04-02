export interface IUser {
  id: string;
  name: string | null;
  email: string;
  password: string;
  role: "SUPERADMIN" | "ADMIN" | "USER";
  isVerified: boolean;
  provider: string | null;
  provider_id: string | null;
  ipAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserPayload {
  userId: string;
  email: string;
  sessionId?: string;
  role?: "SUPERADMIN" | "ADMIN" | "USER"; // matches Prisma Role enum
  iat?: number; // issued at
  exp?: number; // expiry timestamp
}

export interface SignUpProps {
  name: string;
  email: string;
  password: string;
  role?: "SUPERADMIN" | "ADMIN" | "USER";
  isVerified?: "true" | "false";
}

export interface SignInProps {
  email: string;
  password: string;
}

export interface Config {
  env: {
    apiEndpoint: string;
    localDatabaseUrl: string;
  };
  jwt: {
    secret: string;
    refreshSecret: string;
  };
  server: {
    port: number;
    idleTimeout: number;
    compressionLevel: number;
    compressionThreshold: number;
    origin: string;
  };
  Email: {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
    tls?: {
      rejectUnauthorized?: boolean;
      ciphers?: string;
    };
    debug?: boolean;
    requireTLS?: boolean;
    ssl?: {
      ca?: string;
      key?: string;
      cert?: string;
    };
  };
  csrf: {
    secret: string;
    cookieOpts: {
      signed: boolean;
    };
  };
  rateLimit: {
    global: boolean;
    max: number;
    ban: number;
    timeWindow: number;
    hook: (req: FastifyRequest, res: FastifyReply) => void;
    cache: number;
    allowList: string[];
    nameSpace: string;
    continueExceeding: boolean;
    skipOnError: boolean;
    keyGenerator: ((req: FastifyRequest) => string) | null;
    errorResponseBuilder:
      | ((req: FastifyRequest, context: any) => object)
      | null;
  };
  addHeaders: {
    // default show all the response headers when rate limit is reached
    "x-rate-limit-limit": true;
    "x-rate-limit-remaining": true;
    "x-rate-limit-reset": true;
    "retry-after": true;
  };
  firebase: {
    apiKey: string;
    vapidKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
}

export interface FirebaseSignInProps {
  email: string;
  name?: string;
  provider: string;
  providerId: string;
}

export interface FirebaseSignUpProps {
  idToken: string;
  email: string;
  name?: string;
  provider: string;
  providerId: string;
}

export interface IFirebaseUser {
  uid: string;
  email: string;
  name?: string | null;
  provider: string;
  emailVerified: boolean;
  idToken: string;
  role?: "SUPERADMIN" | "ADMIN" | "USER"; // matches Prisma Role enum
}

export type FirebaseProps = IFirebaseUser;

export interface ICsrfService {
  generateToken(reply: FastifyReply): string;
  validateToken(req: FastifyRequest): boolean;
}

export interface SendEmailProps {
  to: string;
  subject: string;
  body: string;
  link?: string;
}

export interface IPasswordHasher {
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hashedPassword: string): Promise<boolean>;
  validatePassword(password: string): void;
}

export interface IAdmin {
  kind: string;
  users: [
    {
      localId: string;
      email: string;
      displayName: string;
      photoUrl: string;
      emailVerified: boolean;
      providerUserInfo: Array<{
        providerId: string;
        displayName: string;
        photoUrl: string;
        federatedId: string;
        email: string;
      }>;
      validSince: string;
      lastLoginAt: string;
      createdAt: string;
      lastRefreshAt: string;
    },
  ];
}
