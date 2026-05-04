-- CreateEnum
CREATE TYPE "BodyType" AS ENUM ('SEDAN', 'HATCHBACK', 'WAGON', 'SUV', 'CROSSOVER', 'COUPE', 'CONVERTIBLE', 'MINIVAN', 'PICKUP', 'VAN', 'OTHER');

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "bodyType" "BodyType";
