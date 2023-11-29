import { auth } from "@/auth";
import HomeFeed from "@/components/HomeFeed";
import { redirect } from "next/navigation";

export default async function Home() {

  return (
    <main className="container">
      <HomeFeed />
    </main>
  );
}
