import { FastifyRequest } from "fastify";

type KeyGenOptions = { ip?: boolean; url?: boolean; headers?: boolean };

export const defaultKeyGenerator = (options: KeyGenOptions = {}) => {
  return (req: FastifyRequest): string => {
    let key = "";
    if (options.ip) key += req.ip;
    if (options.url) key += `_${req.url}`;
    if (options.headers) key += `_${req.headers["user-agent"] || ""}`;
    return key || req.ip; // fallback
  };
};

export default defaultKeyGenerator;
