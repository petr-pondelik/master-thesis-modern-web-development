import { ApiProperty } from '@nestjs/swagger';

export class JwtEnvelope {
  @ApiProperty()
  access_token: string;

  constructor(jwt: string) {
    this.access_token = jwt;
  }
}
