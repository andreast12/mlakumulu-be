-- CreateTable
CREATE TABLE "Travel" (
    "id" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "destination" TEXT NOT NULL,
    "touristId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Travel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Travel" ADD CONSTRAINT "Travel_touristId_fkey" FOREIGN KEY ("touristId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
