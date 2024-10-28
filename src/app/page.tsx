import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import View from "./view";
import type { ResponseData } from "@/pages/api/task";
import { getData } from "@/helper/data";

export default async function Page() {
  // server logic and magic goes here
  const cookieStore = await cookies();
  const session = await cookieStore.get("session");
  if (!session) {
    redirect("/login");
  }
  let res: ResponseData = await getData(session.value);
  return <View taskList={res.data} />;
}
