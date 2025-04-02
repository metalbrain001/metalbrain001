import { FastifyInstance } from "fastify";
import { AdminController } from "../controller/admin.js";
import { AdminUseCase } from "../repository/admin/AdminUseCase.js";
import { FirebaseAdminRepo } from "../repository/admin/IAdminRepo.js";

// Initialize FirebaseController
const firebaseAdminRepo = new FirebaseAdminRepo();
const adminUseCase = new AdminUseCase(firebaseAdminRepo);
const adminController = new AdminController(adminUseCase);

// Firebase routes
export async function adminRoutes(app: FastifyInstance) {
  app.post("/api/get-admin", {
    handler: async (req, res) => adminController.getAdmin(req, res),
  });
}

export default adminRoutes;
