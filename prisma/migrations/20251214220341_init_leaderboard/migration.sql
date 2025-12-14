-- CreateTable
CREATE TABLE "LeaderboardEntry" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeaderboardEntry_pkey" PRIMARY KEY ("id")
);
