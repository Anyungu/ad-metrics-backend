import { ObjectType, Field } from '@nestjs/graphql';
import { Insight } from './insight.model';

@ObjectType()
class Cursors {
  @Field(() => String)
  before: string;

  @Field(() => String)
  after: string;
}

@ObjectType()
class Paging {
  @Field(() => Cursors)
  cursors: Cursors;
}

@ObjectType()
export class InsightResponse {
  @Field(() => [Insight])
  data: Insight[];

  @Field(() => Paging)
  paging: Paging;
}
