import { FastifyRequest, FastifyReply } from "fastify";
import { FirebaseUseCase } from "../repository/firebase/firebaseusecase.js";
import { FirebaseAuthService } from "../services/firebaseservice.js";

export class FirebaseController {
  constructor(
    private readonly useCase: FirebaseUseCase,
    private readonly firebaseTokenService: FirebaseAuthService,
  ) {}

  getUser = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { idToken } = request.body as { idToken: string };

      const decoded = await this.firebaseTokenService.verifyToken(idToken);

      // const user = await this.useCase.getUser(decoded);
      const user = await this.useCase.getUser({
        ...decoded,
        idToken, // ✅ include it here
      });

      if (!user) {
        return reply.code(404).send({ error: "User not found in Firestore" });
      }

      return reply.send(user);
    } catch (err) {
      console.error("Get User Error:", err);
      return reply.code(500).send({ error: "Server Error" });
    }
  };
}

export default FirebaseController;
