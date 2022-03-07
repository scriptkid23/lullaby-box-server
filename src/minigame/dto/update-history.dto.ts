import { ApiProperty } from '@nestjs/swagger';

export class UpdateHistoryDto {
  @ApiProperty({
    default: '0x',
  })
  address: string;
  @ApiProperty({
    default: 'Eugene A Silverman',
  })
  message: string;
 
}
