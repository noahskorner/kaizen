import { Repository } from '@kaizen/core-server';
import {
  FindCategoriesQuery,
  FindCategoriesResponse,
  IFindCategoriesRepository
} from '@kaizen/finance';

export class FindCategoriesRepository
  extends Repository
  implements IFindCategoriesRepository
{
  public async find(
    query: FindCategoriesQuery
  ): Promise<FindCategoriesResponse> {
    const response: { category: string; count: number }[] = await this._prisma
      .$queryRaw`
      SELECT "category", CAST(COUNT(*) AS INT) as "count"
      FROM (
        SELECT "category"."original_category" as "category"
        FROM "category"
        JOIN "transaction" ON "category"."id" = "transaction"."category_id"
        WHERE "transaction"."user_id" = ${query.userId} AND "category"."original_category" IS NOT NULL
        UNION ALL
        SELECT "category"."user_category" as "category"
        FROM "category"
        JOIN "transaction" ON "category"."id" = "transaction"."category_id"
        WHERE "transaction"."user_id" = ${query.userId} AND "category"."user_category" IS NOT NULL
      ) AS "categories"
      GROUP BY "category"
      ORDER BY "count" DESC;
    `;

    return response.reduce((prev, current) => {
      prev[current.category] = current.count;
      return prev;
    }, {} as FindCategoriesResponse);
  }
}
