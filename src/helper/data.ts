export async function getData(session: string) {
  let url = `https://${process.env.VERCEL_URL}/api/task`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Cookie: `session=${session}`,
      "content-type": "application/json",
    },
  });
  return res.json();
}
export async function getConfig() {
  let url = `https://${process.env.VERCEL_URL}/config.json`;
  const res = await fetch(url);
  return res.json();
}

export enum APIMethod {
  PUT = "PUT",
  DELETE = "DELETE",
  POST = "POST",
}
