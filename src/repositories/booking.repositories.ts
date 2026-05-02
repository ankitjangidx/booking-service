import { prisma } from "../prisma/client";
import { Prisma, IdempotencyKey } from "../prisma/generated/client";
import { BookingCreateInput } from "../prisma/generated/models";
import { validate as validateUUID } from "uuid";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";

export async function createBooking(bookingInput: BookingCreateInput) {
  const booking = await prisma.booking.create({ data: bookingInput });
  return booking;
}

export async function createIdempotencyKey(key: string, bookingId?: number) {
  const idempotencykey = await prisma.idempotencyKey.create({
    data: {
      idemKey: key,
      booking: {
        connect: {
          id: bookingId,
        },
      },
    },
  });
  return idempotencykey;
}

export async function getIdempotentKeyWithLock(
  tx: Prisma.TransactionClient,
  key: string,
) {
  if (!validateUUID(key)) {
    throw new BadRequestError("Invalid Idempotency Key Format");
  }
  const idempotentkey: Array<IdempotencyKey> =
    await tx.$queryRaw`SELECT * FROM IdempotencyKey where idemKey = ${key} FOR UPDATE;`;
  if (!idempotentkey || idempotentkey.length === 0) {
    throw new NotFoundError("Idempotency Key not found");
  }
  return idempotentkey[0];
}

export async function getBookingById(id: number) {
  const booking = await prisma.booking.findUnique({
    where: {
      id,
    },
  });
  return booking;
}
export async function confirmBooking(
  tx: Prisma.TransactionClient,
  bookingId: number,
) {
  const booking = await tx.booking.update({
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
export async function finalizeIdempotencyKey(
  tx: Prisma.TransactionClient,
  key: string,
) {
  const idempotencyKey = await tx.idempotencyKey.update({
    where: {
      idemKey: key,
    },
    data: {
      finalize: true,
    },
  });
  return idempotencyKey;
}
