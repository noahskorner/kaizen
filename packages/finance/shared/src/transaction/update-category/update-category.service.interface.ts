import { ServiceResponse } from '@kaizen/core';
import { UpdateCategoryCommand } from './update-category.command';
import { Category } from '../../category/category';

export interface IUpdateCategoryService {
  update(command: UpdateCategoryCommand): Promise<ServiceResponse<Category>>;
}
