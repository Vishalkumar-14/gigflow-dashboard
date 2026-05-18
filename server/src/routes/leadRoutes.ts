import express from "express";

import {
  createLead,
  getLeads,
  getLeadStats,
} from "../controllers/leadController";

import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createLead
);

router.get(
  "/",
  authMiddleware,
  getLeads
);

router.get(
  "/stats",
  authMiddleware,
  getLeadStats
);

export default router;