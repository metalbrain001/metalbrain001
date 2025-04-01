import admin from "firebase-admin";
import path from "path";
import { readFileSync } from "fs";

const serviceKeyPath = path.resolve("dist/service_key.json");
const raw = readFileSync(serviceKeyPath, "utf-8");
const serviceAccount = JSON.parse(raw);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export { admin };
