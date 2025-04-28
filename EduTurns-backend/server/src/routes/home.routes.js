import { Router } from "express";

const router = Router()

router.route("/").get((_,res) => res.send("API Working"))

export default router