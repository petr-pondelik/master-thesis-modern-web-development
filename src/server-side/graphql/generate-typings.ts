import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

console.log(join(process.cwd(), 'src/**/*.graphql'));

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./src/**/*.graphqls'],
  path: join(process.cwd(), 'src/graphql/graphql.ts'),
  outputAs: 'class',
});