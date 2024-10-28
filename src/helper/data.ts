export async function getData(session: string) {
  console.log(111, process.env.VERCEL_URL);

  let url = `https://${process.env.VERCEL_URL}/api/task`;
  console.log(112, url);
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Cookie: `session=${session}`,
      "content-type": "application/json",
    },
  });
  console.log(113, res);
  console.log(114, res);
  console.log(115, res.json);
  return res.json();
}
export async function getConfig() {
  console.log(114);
  let url = `https://${process.env.VERCEL_URL}/config.json`;
  console.log(112, url);
  const res = await fetch(url);
  return res.json();
}

export enum APIMethod {
  PUT = "PUT",
  DELETE = "DELETE",
  POST = "POST",
}
