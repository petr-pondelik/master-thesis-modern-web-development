import { Link } from '../hateoas';

export class ResponseEnvelope<T> {
  public data: T;
  public links: Array<Link>;

  constructor(data: T) {
    this.data = data;
  }
}
