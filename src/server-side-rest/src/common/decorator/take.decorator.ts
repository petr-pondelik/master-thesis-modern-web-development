import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Take = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const take = request.query.take;
  return take ?? 10;
});