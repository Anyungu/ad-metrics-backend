import { ObjectType, Field } from '@nestjs/graphql';
import { Insight } from '../models/insight.model';

@ObjectType()
class Cursors {
  @Field()
  before: string;

  @Field()
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
