export async function getConfig() {
  let url = `${process.env.VERCEL_URL}/config.json`;
  if (url.indexOf("http") !== 0) {
    url = `https://${url}`;
  }
  const res = await fetch(url);
  return res.json();
}

export enum APIMethod {
  PUT = "PUT",
  DELETE = "DELETE",
  POST = "POST",
}
