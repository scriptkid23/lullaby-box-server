import { ApiProperty } from '@nestjs/swagger';

export class CreateAudioDto {
  @ApiProperty({
    default: 'Eugene A Silverman',
  })
  name: string;
  @ApiProperty({
    default: 'epvh1o2qnao@temporary-mail.net',
  })
  artist: string;
  @ApiProperty({
    default: '123',
  })
  url: string;
  @ApiProperty({
    default: '123',
  })
  image: string;
}
