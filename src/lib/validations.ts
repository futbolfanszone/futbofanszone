import { z } from "zod";

const honeypot = z.string().max(0).optional().or(z.literal(""));

export const subscribeSchema = z.object({
  email: z.string().email("Enter a valid email"),
  source: z.string().max(80).optional(),
  website: honeypot,
});

export const applySchema = z.object({
  type: z.enum(["quiz", "job", "general"]),
  name: z.string().min(2, "Name is required").max(120),
  email: z.string().email("Enter a valid email"),
  phone: z.string().max(40).optional().or(z.literal("")),
  instagram: z.string().max(120).optional().or(z.literal("")),
  tiktok: z.string().max(120).optional().or(z.literal("")),
  youtube: z.string().max(200).optional().or(z.literal("")),
  message: z.string().min(20, "Tell us a bit more (20+ characters)").max(4000),
  availability: z.string().max(500).optional().or(z.literal("")),
  videoLink: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  website: honeypot,
});

export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  subject: z.string().max(160).optional().or(z.literal("")),
  message: z.string().min(10).max(4000),
  website: honeypot,
});

export const adminLoginSchema = z.object({
  password: z.string().min(1),
});

export const applicationStatusSchema = z.object({
  status: z.enum(["new", "shortlisted", "picked", "rejected"]),
});
