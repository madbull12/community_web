
import { tags } from "@/db/schema/tags";
import { db } from "@/lib/drizzle";

type CreateTagDto= {
    tag:string;
}

export async function createPost(tag:CreateTagDto[]): Promise<void> {
    await db.insert(tags).values([...tag])
  }
  