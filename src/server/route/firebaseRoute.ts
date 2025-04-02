import { FastifyInstance } from "fastify";
import { FirebaseController } from "../controller/firebaseController.js";
import { FirebaseUseCase } from "../repository/firebase/firebaseusecase.js";
import { FirebaseRepo } from "../repository/firebase/firebaseRepo.js";
import { FirebaseAuthService } from "../services/firebaseservice.js";

// Initialize FirebaseController
const firebaseRepo = new FirebaseRepo();
const firebaseUseCase = new FirebaseUseCase(firebaseRepo);
const firebaseAuthService = new FirebaseAuthService();
const firebaseController = new FirebaseController(
  firebaseUseCase,
  firebaseAuthService,
);

// Firebase routes
export async function firebaseRoutes(app: FastifyInstance) {
  app.post("/api/get-firebase-user", {
    handler: async (req, res) => firebaseController.getUser(req, res),
  });
}
