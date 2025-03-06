import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Insight {
  @Field(() => String)
  impressions: string;

  @Field(() => String)
  date_start: string;

  @Field(() => String)
  date_stop: string;
}
