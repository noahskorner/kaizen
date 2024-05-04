import { ServiceResponse } from '@kaizen/core';
import { Category } from '../category';
import { UpdateCategoryCommand } from './update-category.command';

export interface IUpdateCategoryService {
  update(command: UpdateCategoryCommand): Promise<ServiceResponse<Category>>;
}
