import "server-only";

export function getRequestClientKey(request: Request, namespace: string) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const address = forwarded || request.headers.get("x-real-ip") || "local";

  return `${namespace}:${address}`;
}
