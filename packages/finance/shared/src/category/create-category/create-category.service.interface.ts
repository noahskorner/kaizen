import { ServiceResponse } from '@kaizen/core';
import { CreateCategoryCommand } from './create-category.command';
import { Category } from '../category';

export interface ICreateCategoryService {
  create(command: CreateCategoryCommand): Promise<ServiceResponse<Category>>;
}
