import SignIn from "@/components/sign-in";
import { auth } from "../auth"
import Image from 'next/image';

export default async function Home() {

  const session = await auth()
 
  return (

<div>
  asd
  <SignIn />
  {session?.user?.image && (
    <Image src={session.user.image} alt="User Avatar" width={50} height={50} />
  )}
</div>
  );
}
