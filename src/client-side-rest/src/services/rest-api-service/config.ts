export class Config {
  host = 'http://localhost:8080/api';
  apiVersion = 'v1';

  path = (version = true) => {
    return version ? `${this.host}/${this.apiVersion}` : this.host;
  };
}

export default new Config();
