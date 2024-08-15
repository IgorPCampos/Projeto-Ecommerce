import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { ProductsModule } from "./products/products.module";
import { PrismaModule } from "./prisma/prisma.module";
import { CategoriesModule } from "./categories/categories.module";

@Module({
    imports: [UsersModule, ProductsModule, PrismaModule, CategoriesModule],
    controllers: [],
    providers: [],
    exports: []
})
export class AppModule {}