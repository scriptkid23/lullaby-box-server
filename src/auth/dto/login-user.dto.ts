import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    default: 'epvh1o2qnao@temporary-mail.net',
  })
  username: string;
  @ApiProperty({
    default: '123',
  })
  password: string;
}
