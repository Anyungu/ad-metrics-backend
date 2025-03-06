import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Insight {
  @Field()
  impressions: string;

  @Field()
  date_start: string;

  @Field()
  date_stop: string;
}
