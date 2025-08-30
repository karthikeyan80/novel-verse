import { jwtVerify, createRemoteJWKSet, decodeJwt } from "jose";

// Verifies Clerk JWTs using the token's issuer JWKS, no env public key needed
export const verifyClerkJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Decode without verifying to get issuer (iss)
    let iss;
    try {
      const decoded = decodeJwt(token);
      iss = decoded.iss;
      if (!iss) throw new Error("Missing issuer in token");
    } catch (e) {
      return res.status(401).json({ error: "Invalid token format" });
    }

    const JWKS = createRemoteJWKSet(new URL(`${iss}/.well-known/jwks.json`));

    const { payload } = await jwtVerify(token, JWKS, {
      issuer: iss,
      algorithms: ["RS256"],
    });

    req.user = payload; // contains sub (Clerk user id) and more
    next();
  } catch (err) {
    console.error("❌ JWT Error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
