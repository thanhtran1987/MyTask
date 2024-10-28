export async function getData(session: string) {
  console.log(111, process.env.VERCEL_URL);
  let url = `https://${process.env.VERCEL_URL}/api/task`;
  console.log(112, url);
  const res = await fetch(url, {
    headers: {
      Cookie: `session=${session}`,
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
