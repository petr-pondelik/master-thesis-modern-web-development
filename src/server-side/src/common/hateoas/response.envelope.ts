import { HateoasLink } from './index';

export class ResponseEnvelope<T> {
  public data: T;
  public _links: HateoasLink[];

  constructor(data: T) {
    this.data = data;
  }
}
