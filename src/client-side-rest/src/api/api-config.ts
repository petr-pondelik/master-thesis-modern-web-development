import { HateoasLink } from './hateoas';

export type InitData = {
  apiVersion: string,
  _links: HateoasLink[]
}

export class ApiConfig {
  host = 'http://localhost:8080';
  apiVersion = 'v1';

  path = (version = true) => {
    return version ? `${this.host}/${this.apiVersion}` : this.host;
  };
}

export default new ApiConfig();
