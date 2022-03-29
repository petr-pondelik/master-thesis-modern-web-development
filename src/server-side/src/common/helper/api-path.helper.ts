export const apiPath = (controllerPath: string, tail?: number | string, version = 'v1'): string => {
  return tail ? `/${version}/${controllerPath}/${tail}` : `/${version}/${controllerPath}`;
};
