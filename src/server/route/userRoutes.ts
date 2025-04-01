// src/server/routes/userRoutes.ts
import { FastifyInstance } from "fastify";
import PrismaRepo from "../repository/userrepo/prismarepo.js";
import UserUseCases from "../repository/userrepo/userusecases.js";
import { UserController } from "../controller/authenticator.js";
import { BcryptPasswordHandler } from "../services/passwordhandler.js";
import { SessionService } from "../services/sessionservices.js";
import FirebaseAuthService from "../services/firebaseservice.js";

// initialize dependencies
const userRepo = new PrismaRepo();
const passwordHasher = new BcryptPasswordHandler();
const session = new SessionService();
const firebaseAuthService = new FirebaseAuthService();
const userUseCases = new UserUseCases(
  userRepo,
  session,
  passwordHasher,
  firebaseAuthService,
);

// initialize controller
const userController = new UserController(userUseCases);

// user routes

async function userRoute(app: FastifyInstance) {
  app.post("/api/firebase-sign-in", {
    config: {
      rateLimit: {
        max: 5,
        timeWindow: "1 minute",
      },
    },
    handler: userController.firebaseSignIn,
  });

  app.post("/api/sign-up", {
    config: {
      rateLimit: {
        max: 3,
        timeWindow: "1 minute",
      },
    },
    handler: userController.signUp,
  });

  app.post("/api/sign-in", {
    config: {
      rateLimit: {
        max: 5,
        timeWindow: "1 minute",
      },
    },
    handler: userController.signIn,
  });
  app.post("/api/sign-out", userController.signOut);
  app.get("/api/me", userController.getUser);
  app.get("/user", userController.getUserById);
  app.put("/update", userController.updateUser);
  app.delete("/delete", userController.deleteUser);
}

export default userRoute;
