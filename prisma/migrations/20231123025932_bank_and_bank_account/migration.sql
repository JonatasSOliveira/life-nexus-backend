-- CreateTable
CREATE TABLE "Bank" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ispb" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "full_name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BankAccount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bank_id" INTEGER NOT NULL,
    "nickname" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "BankAccount_bank_id_fkey" FOREIGN KEY ("bank_id") REFERENCES "Bank" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Bank_ispb_key" ON "Bank"("ispb");

-- CreateIndex
CREATE UNIQUE INDEX "Bank_name_key" ON "Bank"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Bank_code_key" ON "Bank"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Bank_full_name_key" ON "Bank"("full_name");
