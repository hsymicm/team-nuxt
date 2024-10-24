import { db } from "~/db";
import { hashPassword } from "./password";

export function verifyUsernameInput(username: string): boolean {
	return username.length > 3 && username.length < 32 && username.trim() === username;
}

export async function createUser(email: string, username: string, password: string): Promise<User> {
	const passwordHash = await hashPassword(password);
	// TODO DB INSERT NEW USER
	// RETURN USER
}

export async function updateUserPassword(userId: number, password: string): Promise<void> {
	const passwordHash = await hashPassword(password);
	// TODO DB UPDATE PASSWORD
}

export function getUserPasswordHash(userId: number): string {
	// TODO GET PASSWORD HASH
  // RETURN PASSWORD HASH
}

export function getUserFromUserId(userId: number): User | null {
  // TODO GET USER DATA FROM USERID
  // RETURN USER
}

export function getUserFromEmail(email: string): User | null {
	// TODO GET USER DATA FROM EMAIL
  // RETURN USER
}

export interface User {
	id: number
	email: string
	username: string
  name: string
}