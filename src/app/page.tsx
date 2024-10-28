import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import View from "./view";
import { getData } from "@/pages/api/task";
import { decrypt } from "@/app/lib/session";
import { IUser } from "@/models/User";
import { JWTPayload } from "jose";

export default async function Page() {
  // server logic and magic goes here
  const cookieStore = await cookies();
  const session = await cookieStore.get("session");
  if (!session) {
    redirect("/login");
  }

  const auth: JWTPayload = (await decrypt(session.value)) || {};
  const id: String = auth.id?.toString() || "";
  let res = await getData(id);
  return <View taskList={res} />;
}
