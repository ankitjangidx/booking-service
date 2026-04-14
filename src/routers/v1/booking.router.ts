import express from "express";
import { validateParams, validateRequestBody } from "../../validators";
import {
  bookingIdSchema,
  confirmBookingSchema,
  createBookingSchema,
} from "../../validators/booking.validator";
import {
  cancelBookingHandler,
  confirmBookingHandler,
  createBookingHandler,
  getBookingHandler,
} from "../../controllers/booking.controller";

const bookingRouter = express.Router();

bookingRouter.post(
  "/",
  validateRequestBody(createBookingSchema),
  createBookingHandler,
);
bookingRouter.post(
  "/confirm/:idempotencyKey",
  validateParams(confirmBookingSchema),
  confirmBookingHandler,
);

bookingRouter.get(
  "/:id",
  validateParams(bookingIdSchema),
  getBookingHandler,
);

bookingRouter.post(
  "/:id/cancel",
  validateParams(bookingIdSchema),
  cancelBookingHandler,
);

bookingRouter.get("/health", (req, res) => {
  res.status(200).send("OK");
});

export default bookingRouter;
