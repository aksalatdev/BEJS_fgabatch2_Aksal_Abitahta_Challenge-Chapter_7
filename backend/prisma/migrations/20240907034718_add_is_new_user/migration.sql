/*
  Warnings:

  - You are about to drop the column `otp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `socket_id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "otp",
DROP COLUMN "socket_id",
ADD COLUMN     "isNewUser" BOOLEAN NOT NULL DEFAULT true;
