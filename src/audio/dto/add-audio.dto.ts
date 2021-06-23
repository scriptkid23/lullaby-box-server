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
    default:
      'http://docs.google.com/uc?export=open&id=1UkBcEH3ie6Wsa6CTr65ZsRLwc-1b6MJr',
  })
  url: string;
  @ApiProperty({
    default: '123',
  })
  image: string;
}
