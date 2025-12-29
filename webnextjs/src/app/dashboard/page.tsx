import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Dashboard = async() => {
  const session = await auth();
if (session?.user.role !== "ADMIN") {
  redirect("/");
}

  return (
    <div>
      <h1>Home Dashboard</h1>
    </div>
  )
}

export default Dashboard