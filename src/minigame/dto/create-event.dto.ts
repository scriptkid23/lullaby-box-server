import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({
    default: 'Eugene A Silverman',
  })
  eventId: string;
 
}
