import { ApiProperty } from '@nestjs/swagger';

type User = {
  userId: string;
  name: string;
};
export class AddSeenDto {
  @ApiProperty({
    default: 'Eugene A Silverman',
  })
  roomId: string;
  @ApiProperty({
    default: {
      userId: '123',
      name: '123',
    },
  })
  participant: User;
}
