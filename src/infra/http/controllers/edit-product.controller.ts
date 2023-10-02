import { EditProductUseCase } from '@domain/menu/application/use-cases/edit-product.use-case';
import { Controller, Param, Body, Patch } from '@nestjs/common';
import { ProductNutritionValidationPipe } from '../pipes/product-nutrition-validation.pipe';
import { EditProductRequestDto } from '../dtos/edit-product.request.dto';

@Controller('products')
export class EditProductController {
  constructor(private readonly updateProductUseCase: EditProductUseCase) {}

  @Patch(':id')
  async handle(
    @Param('id') id: string,
    @Body(new ProductNutritionValidationPipe()) data: EditProductRequestDto,
  ) {
    const { message } = await this.updateProductUseCase.execute({
      id,
      ...data,
    });

    return { message };
  }
}