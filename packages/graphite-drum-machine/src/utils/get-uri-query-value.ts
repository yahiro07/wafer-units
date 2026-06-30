export function getUriQueryValue(uri: string, key: string) {
  const query = uri.includes("?") ? uri.slice(uri.indexOf("?") + 1) : "";
  return new URLSearchParams(query).get(key);
}
