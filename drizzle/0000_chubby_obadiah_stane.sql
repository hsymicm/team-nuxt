CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`author_id` integer,
	`posted_at` integer DEFAULT (CURRENT_TIMESTAMP),
	`title` text,
	`image_url` text,
	`description` text,
	`content` text
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text,
	`name` text,
	`email` text
);
