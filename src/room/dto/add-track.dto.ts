import { ApiProperty } from '@nestjs/swagger';
type Track = {
  name: string;
  artist: string;
  url: string;
  image: string;
};
export class AddTrackDto {
  @ApiProperty({
    default: 'Eugene A Silverman',
  })
  roomId: string;
  @ApiProperty({
    default: {
      name: '',
      artist: '',
      url: '',
      image: '',
    },
  })
  track: Track;
}
