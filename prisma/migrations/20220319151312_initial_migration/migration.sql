-- CreateTable
CREATE TABLE "categories" (
    "cat_id" SERIAL NOT NULL,
    "cat_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("cat_id")
);

-- CreateTable
CREATE TABLE "expenses" (
    "expense_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "cat_id" INTEGER,
    "daily_amt" INTEGER,
    "expense_date" DATE,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("expense_id")
);

-- CreateTable
CREATE TABLE "set_bound" (
    "user_id" INTEGER NOT NULL,
    "cat_id" INTEGER NOT NULL,
    "upper_bound" INTEGER,

    CONSTRAINT "set_bound_pkey" PRIMARY KEY ("user_id","cat_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_cat_id_fkey" FOREIGN KEY ("cat_id") REFERENCES "categories"("cat_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "set_bound" ADD CONSTRAINT "set_bound_cat_id_fkey" FOREIGN KEY ("cat_id") REFERENCES "categories"("cat_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "set_bound" ADD CONSTRAINT "set_bound_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
