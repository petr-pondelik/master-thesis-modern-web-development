import { HateoasLink } from './index';

export class ResponseEnvelope<T> {
  public data: T;
  public _links: Array<HateoasLink>;

  constructor(data: T) {
    this.data = data;
  }
}
