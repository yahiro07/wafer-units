export const appEnvs = {
  isDevelopment: import.meta.env.DEV,
  isLocalDebug: location.href.includes("localhost"),
};
