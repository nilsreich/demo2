CREATE TABLE `documentsTable` (
	`id` text PRIMARY KEY NOT NULL,
	`content` text,
	`userId` text NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
