import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    default: 'Eugene A Silverman',
  })
  name: string;
  @ApiProperty({
    default: 'epvh1o2qnao@temporary-mail.net',
  })
  email: string;
  @ApiProperty({
    default: '123',
  })
  password: string;
}
