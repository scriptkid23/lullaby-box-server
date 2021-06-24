import { ApiProperty } from '@nestjs/swagger';
type User = {
  userId: string;
  name: string;
  avatar: string;
};
export class CreateRoomDto {
  @ApiProperty({
    default: 'Eugene A Silverman',
  })
  roomId: string;
  @ApiProperty({
    default: 'epvh1o2qnao@temporary-mail.net',
  })
  name: string;
  @ApiProperty({
    default: {
      userId: '123',
      name: '123',
      avatar: '123',
    },
  })
  participant: User;
}
