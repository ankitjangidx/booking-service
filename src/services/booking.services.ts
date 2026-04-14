import { CreteBookingDTO } from "../dtos/booking.dto";
import {
  cancelBooking,
  confirmBooking,
  createBooking,
  createIdempotencyKey,
  finalizeIdempotencyKey,
  getBookingById,
  getIdempotentKey,
} from "../repositories/booking.repositories";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/generateIdempotencyKey";

export async function createBookingService(creteBookingDTO: CreteBookingDTO) {
  const booking = await createBooking(creteBookingDTO);
  const idempotencyKey = generateIdempotencyKey();
  const idempotencyKeyData = await createIdempotencyKey(idempotencyKey, booking.id);
  return {
    bookingId: booking.id,
    idempotencyKeyId: idempotencyKeyData.id,
  };
}

export async function confirmBookingService(idempotencyKey: string) {
  const idempotencyKeyData = await getIdempotentKey(idempotencyKey);
  if (!idempotencyKeyData) {
    throw new NotFoundError("idempotency key not found");
  }
  if (idempotencyKeyData.finalize) {
    throw new BadRequestError("idempotency key already finalized");
  }
  
  if (!idempotencyKeyData.bookingId) {
    throw new BadRequestError("booking id not found for idempotency key");
  }

  const booking = await confirmBooking(idempotencyKeyData.bookingId);
  await finalizeIdempotencyKey(idempotencyKey);
  return booking;
}

export async function getBookingService(bookingId: number) {
  const booking = await getBookingById(bookingId);
  if (!booking) {
    throw new NotFoundError("booking not found");
  }
  return booking;
}

export async function cancelBookingService(bookingId: number) {
  const booking = await getBookingById(bookingId);
  if (!booking) {
    throw new NotFoundError("booking not found");
  }
  const cancelledBooking = await cancelBooking(bookingId);
  return cancelledBooking;
}
