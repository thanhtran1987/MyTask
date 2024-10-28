import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import View from "./view";

export default async function Page() {
  // server logic and magic goes here
  const cookieStore = await cookies();
  const session = await cookieStore.get("session");
  if (!session) {
    redirect("/login");
  }
  return <View />;
}
