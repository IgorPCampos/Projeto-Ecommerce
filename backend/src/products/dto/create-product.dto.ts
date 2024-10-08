import { CategoriesOnProducts } from "@prisma/client";
import { ArrayNotEmpty, IsArray, IsDefined, IsInt, IsNotEmpty, IsNumber } from "class-validator";

class CategoryProductDto {
    @IsNotEmpty()
    @IsInt()
    categoryId: number;
}

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    quantity: number;

    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @IsInt({ each: true })
    categories: number[]; 
}
