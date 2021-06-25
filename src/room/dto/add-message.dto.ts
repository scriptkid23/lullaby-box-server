import { ApiProperty } from '@nestjs/swagger';
type Message = {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  message: string;
};
export class AddMessageDto {
  @ApiProperty({
    default: 'Eugene A Silverman',
  })
  roomId: string;
  @ApiProperty({
    default: {
      id: 'string',
      userId: 'string',
      name: 'string',
      avatar: 'string',
      message: 'string',
    },
  })
  message: Message;
}
