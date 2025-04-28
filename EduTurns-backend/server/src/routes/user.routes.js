import { Router } from "express";
import { clerkWebhooks } from "../controllers/webhooks.controller";

const router = Router()

router.route("/clerk").post(clerkWebhooks)

export default router