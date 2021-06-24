import { ApiProperty } from '@nestjs/swagger';

export class LeaveRoomDto {
  @ApiProperty({
    default: 'Eugene A Silverman',
  })
  roomId: string;
  @ApiProperty({
    default: '',
  })
  useId: string;
}
