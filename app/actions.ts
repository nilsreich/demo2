'use server'

import {auth} from "@/auth"
import {db} from "@/db"
import {documentsTable} from "@/db/schema"
import { revalidatePath } from "next/cache"

export const createDocument = async (formData:FormData) => {
    const content = formData.get('content') as string

    const session = await auth()

    if (!session?.user?.id) {
        throw new Error("User not authenticated")
    }

    await db.insert(documentsTable).values({
        id: crypto.randomUUID(),
        content,
        userId: session.user.id
    })

    revalidatePath('/')
}


