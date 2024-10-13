import SignIn from "@/components/sign-in";
import { auth } from "../auth"
import Image from 'next/image';
import { db } from '@/db';
import { documentsTable } from '@/db/schema';
import { eq } from "drizzle-orm";
import { createDocument } from "@/app/actions";
import Chat from "@/components/Chat";

export default async function Home() {

  const session = await auth()

  if (!session?.user?.id) {
    return <SignIn />
  }

  const documents = await db.select().from(documentsTable).where(eq(documentsTable.userId, session.user.id));

  return (

    <div>
      <Image src={session.user.image!} alt="User Avatar" width={50} height={50} />
      <div>
        <h1>Documents</h1>
        <ul>
          {documents.map((doc) => (
            <li key={doc.id}>{doc.content}</li>
          ))}
        </ul>
        <h2>Create a new document</h2>
        <form action={createDocument}>
          <input type="text" name='content' />
          <button type="submit">Submit</button>
        </form>
      </div>
      <Chat />
    </div>
  );
}
