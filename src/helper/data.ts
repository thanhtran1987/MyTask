export async function getData(session: string) {
  let url = `${process.env.API_URL}/api/task`;
  const res = await fetch(url, {
    headers: {
      Cookie: `session=${session}`,
    },
  });
  return res.json();
}
export async function getConfig() {
  let url = `${process.env.API_URL}/config.json`;
  const res = await fetch(url);
  return res.json();
}

export enum APIMethod {
  PUT = "PUT",
  DELETE = "DELETE",
  POST = "POST",
}
