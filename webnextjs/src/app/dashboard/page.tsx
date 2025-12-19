import { auth } from "@/auth";
import { signoutAction } from "@/actions/auth.action";

const Dashboard = async() => {
    const session = await auth();
  return (
    <div>{session?.user && 
        <>
        <p>{JSON.stringify(session)}</p>
            <h1>
                Welcome {session.user.name}
            </h1>
            <form action={signoutAction}>
              <button type="submit">Sign out</button>
            </form>
        </>
    }</div>
  )
}

export default Dashboard