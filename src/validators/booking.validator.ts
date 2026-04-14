import { z } from "zod";

export const createBookingSchema = z.object({
  userId: z.number(),
  roomId: z.number(),
  totalGuests: z.number(),
  bookingAmount: z.number(),
});
export const confirmBookingSchema = z.object({
  idempotencyKey: z.string(),
});
export const bookingIdSchema = z.object({
  id: z.string().regex(/^\d+$/, "id must be a numeric string"),
});
