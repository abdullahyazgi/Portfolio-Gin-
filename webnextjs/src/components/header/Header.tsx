'use server'
import NavBar from './NavBar';
import Link from 'next/link';
import { auth } from "@/auth";
import { signoutAction } from '@/actions/auth.action';

const Header = async () => {
  const session = await auth();
  console.log(session)
  return (
    <header>
       <NavBar role={session?.user?.role ?? null} /> 
      <div>
        
        {session?.user ? (
          <>
            <p>{session.user.name}</p>
            <form action={signoutAction}>
              <button type="submit">Sign out</button>
            </form>
          </>
        ) : (
          <Link href="/signin">Sign in</Link>
        )}
      </div>
    </header>
  )
}

export default Header