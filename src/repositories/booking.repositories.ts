import { prisma } from "../prisma/client";
import { BookingCreateInput } from "../prisma/generated/models";


export async function createBooking(bookingInput: BookingCreateInput){
const booking = await prisma.booking.create({data: bookingInput})
return booking;
}
