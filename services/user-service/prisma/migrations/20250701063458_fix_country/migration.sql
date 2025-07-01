-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'artist', 'admin');

-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('free', 'pro', 'pro_plus');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'banned', 'suspended', 'deleted');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "plan" "Plan" NOT NULL,
    "status" "Status" NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "profileImage" TEXT,
    "bannerImage" TEXT,
    "backgroundImage" TEXT,
    "bio" TEXT,
    "country" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
