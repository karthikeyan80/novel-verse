import { jwtVerify, importSPKI } from "jose";

export const verifyClerkJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const publicKey = process.env.CLERK_JWT_PUBLIC_KEY;
    const alg = "RS256";
    const key = await importSPKI(publicKey, alg);

    const { payload } = await jwtVerify(token, key);
    req.user = payload;

    next();
  } catch (err) {
    console.error("❌ JWT Error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
