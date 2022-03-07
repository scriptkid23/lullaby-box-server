import { ApiProperty } from '@nestjs/swagger';

export class UpdateTotalSupplyDto {
  @ApiProperty({
    default: '1000',
  })
  eventId: string;
  @ApiProperty({
    default: '1000',
  })
  amount: string;
}
