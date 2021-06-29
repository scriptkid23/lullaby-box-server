import { ApiProperty } from '@nestjs/swagger';

export class AddEffectScreenDto {
  @ApiProperty({
    default: 'Eugene A Silverman',
  })
  keywork: string;
  @ApiProperty({
    default: 'Url',
  })
  url: string;
}
