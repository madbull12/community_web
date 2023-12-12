import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SubmitLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const session = await auth();
    if (!session?.user) {
      redirect("/api/auth/signin?callbackUrl=/");
    }
    return (
      <>
          {children}
          
      </>
    );
  }
  