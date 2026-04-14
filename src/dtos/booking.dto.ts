import { z } from "zod";
import { createBookingSchema } from "../validators/booking.validator";

export type CreteBookingDTO = z.infer<typeof createBookingSchema>; 