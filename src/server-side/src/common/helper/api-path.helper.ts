export const apiPath = (controllerPath: string, tail?: number | string): string => {
  return tail ? `/${controllerPath}/${tail}` : `/${controllerPath}`;
};
