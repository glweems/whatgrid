import React from 'react';
import Link from 'next/link';
interface Props {}

const Navbar: React.FC<Props> = () => {
  return (
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/signup">
        <a>Sign Up</a>
      </Link>
      <Link href="/login">
        <a>Login</a>
      </Link>
    </nav>
  );
};

export default Navbar;
