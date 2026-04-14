import { Request, Response } from "express";
import {
  cancelBookingService,
  confirmBookingService,
  createBookingService,
  getBookingService,
} from "../services/booking.services";

export async function createBookingHandler(req: Request, response: Response) {
  const booking = await createBookingService(req.body);
  response.status(201).json({
    bookingId: booking.bookingId,
    idempotencyKey: booking.idempotencyKeyId,
  });
}
export async function confirmBookingHandler(req: Request, res: Response) {
  const booking = await confirmBookingService(req.params.idempotencyKey);
  res.status(200).json({
    bookingId: booking.id,
    status: booking.status,
  });
}

export async function getBookingHandler(req: Request, res: Response) {
  const booking = await getBookingService(Number(req.params.id));
  res.status(200).json(booking);
}

export async function cancelBookingHandler(req: Request, res: Response) {
  const booking = await cancelBookingService(Number(req.params.id));
  res.status(200).json({
    bookingId: booking.id,
    status: booking.status,
  });
}
