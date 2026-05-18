import { Request, Response } from "express";

import Lead from "../models/Lead";

export const createLead = async (
  req: Request,
  res: Response
) => {
  try {
    const lead = await Lead.create(
      req.body
    );

    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getLeads = async (
  req: Request,
  res: Response
) => {
  try {
    const leads = await Lead.find();

    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getLeadStats = async (
  req: Request,
  res: Response
) => {
  try {
    const totalLeads =
      await Lead.countDocuments();

    const qualifiedLeads =
      await Lead.countDocuments({
        status: "qualified",
      });

    const lostLeads =
      await Lead.countDocuments({
        status: "lost",
      });

    res.status(200).json({
      totalLeads,
      qualifiedLeads,
      lostLeads,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deleteLead = async (
  req: Request,
  res: Response
) => {
  try {
    const lead =
      await Lead.findByIdAndDelete(
        req.params.id
      );

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json({
      message:
        "Lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const updateLeadStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const { status } = req.body;

    const lead =
      await Lead.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found",
      });
    }

    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};