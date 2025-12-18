import NavBar from './NavBar';
import Link from 'next/link';

const Header = () => {
  return (
    <header>
        <NavBar />
        <div>
            <Link href="/signin">Sign in</Link>
        </div>
    </header>
  )
}

export default Header