import { Router } from "express";
import * as userController from "../controllers/user-controller.js";
import { body } from "express-validator";
import * as authMiddleware from "../middlewares/auth-middleware.js";

const router = Router();

router.post("/register",
    body("email").isEmail().withMessage("Email must be a valid email address"),
    body("password").isLength({ min: 3, max: 32 }).withMessage("Password must be at least 3 characters long and at most 32 characters small"),
    userController.createUserController
);

router.post("/login",
    body("email").isEmail().withMessage("Email must be a valid email address"),
    body("password").isLength({ min: 3, max: 32 }).withMessage("Password must be at least 3 characters long and at most 32 characters small"),
    userController.loginUserController // Ensure this method is defined and imported
);

router.get("/profile", authMiddleware.authUser, userController.profileUserController); // Ensure this method is defined and imported

export default router;