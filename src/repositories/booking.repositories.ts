import { prisma } from "../prisma/client";
import { bookingStatus } from "../prisma/generated/enums";
import { BookingCreateInput } from "../prisma/generated/models";

export async function createBooking(bookingInput: BookingCreateInput) {
  const booking = await prisma.booking.create({ data: bookingInput });
  return booking;
}

export async function createIdempotencyKey(key: string, bookingId?: number) {
  const idempotencykey = await prisma.idempotencyKey.create({
    data: {
      key: key,
      booking: {
        connect: {
          id: bookingId,
        },
      },
    },
  });
  return idempotencykey;
}

export async function getIdempotentKey(key: string) {
  const idempotentkey = await prisma.idempotencyKey.findUnique({
    where: {
      key,
    },
  });
  return idempotentkey;
}

export async function getBookingById(id: number) {
  const booking = await prisma.booking.findUnique({
    where: {
      id,
    },
  });
  return booking;
}
export async function confirmBooking(bookingId: number) {
  const booking = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: "CONFIRMED",
    },
  });
  return booking;
}
export async function cancelBooking(bookingId: number) {
  const booking = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: "CANCELLED",
    },
  });
  return booking;
}
export async function finalizeIdempotencyKey(key: string) {
  const idempotencyKey = await prisma.idempotencyKey.update({
    where: {
      key,
    },
    data: {
      finalize: true,
    },
  });
  return idempotencyKey;
}
