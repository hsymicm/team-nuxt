import { db } from "~/db";

export function verifyEmailInput(email: string): boolean {
	return /^.+@.+\..+$/.test(email) && email.length < 256;
}

export function checkEmailAvailability(email: string): boolean {
	// TODO SELECT WHERE EMAIL 
  // RETURN BOOLEAN
}