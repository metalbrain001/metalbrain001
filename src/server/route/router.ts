// router.ts
import { FastifyInstance } from "fastify";
import userRoute from "./userRoutes.js";
import EmailRoute from "./emailRoute.js";
import testRoutes from "./test.js";
import { csrfRoutes } from "./csrfRoute.js";
import { firebaseRoutes } from "./firebaseRoute.js";
import { adminRoutes } from "./adminRoutes.js";

export async function router(app: FastifyInstance) {
  await adminRoutes(app);
  await firebaseRoutes(app);
  await csrfRoutes(app);
  await userRoute(app);
  await EmailRoute(app);
  await testRoutes(app);
}

export default router;
