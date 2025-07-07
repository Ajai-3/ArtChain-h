// import { TokenService } from "../services/TokenService";
// import { AuthenticationError } from "../../errors/AuthenticationError";

// export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//     try {

//         const refreshToken = req.cookies.refreshToken;

//         const authHeader = req.headers.get("authorization");

//         if (!authHeader ||!authHeader.startsWith("Bearer ")) {
//             throw new AuthenticationError("Invalid or missing authorization header")
//         }

//         const token = authHeader?.split(" ")[1];

//         if (token) {
//             const user = TokenService.verifyRefreshToken(token)
//         }

//         next()
//     } catch (error) {

//         if (error instanceof AuthenticationError) {
//             return res.status(401).json({ message: error.message });
//         }
        
//     }
// }