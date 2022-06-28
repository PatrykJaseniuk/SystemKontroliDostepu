/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Klient" (
    "id" SERIAL NOT NULL,
    "imie" TEXT NOT NULL,
    "nazwisko" TEXT NOT NULL,

    CONSTRAINT "Klient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Karnet" (
    "id" SERIAL NOT NULL,
    "dataSprzedarzy" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataKoscaAktywnosci" TIMESTAMP(3) NOT NULL,
    "iloscBazowaWizyt" INTEGER NOT NULL DEFAULT 100,
    "iloscWykozystanychWizyt" INTEGER NOT NULL DEFAULT 0,
    "czyJestUzywany" BOOLEAN NOT NULL DEFAULT false,
    "klientId" INTEGER NOT NULL,
    "karnetTypId" INTEGER NOT NULL,

    CONSTRAINT "Karnet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KarnetTyp" (
    "id" SERIAL NOT NULL,
    "nazwa" TEXT NOT NULL,
    "okresWaznosci" INTEGER NOT NULL,
    "iloscWizyt" INTEGER NOT NULL,
    "cena" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "KarnetTyp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usluga" (
    "id" SERIAL NOT NULL,
    "nazwa" TEXT NOT NULL,

    CONSTRAINT "Usluga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_KarnetTypToUsluga" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_KarnetTypToUsluga_AB_unique" ON "_KarnetTypToUsluga"("A", "B");

-- CreateIndex
CREATE INDEX "_KarnetTypToUsluga_B_index" ON "_KarnetTypToUsluga"("B");

-- AddForeignKey
ALTER TABLE "Karnet" ADD CONSTRAINT "Karnet_klientId_fkey" FOREIGN KEY ("klientId") REFERENCES "Klient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Karnet" ADD CONSTRAINT "Karnet_karnetTypId_fkey" FOREIGN KEY ("karnetTypId") REFERENCES "KarnetTyp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KarnetTypToUsluga" ADD CONSTRAINT "_KarnetTypToUsluga_A_fkey" FOREIGN KEY ("A") REFERENCES "KarnetTyp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KarnetTypToUsluga" ADD CONSTRAINT "_KarnetTypToUsluga_B_fkey" FOREIGN KEY ("B") REFERENCES "Usluga"("id") ON DELETE CASCADE ON UPDATE CASCADE;
