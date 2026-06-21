import { prisma as db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Layout from "./components/home/Layout";

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const files = await db.file.findMany({
    where: { userId: user.id, folderId: null },
    orderBy: { createdAt: "desc" },
  });

  const folders = await db.folder.findMany({
    where: { userId: user.id, parentId: null },
  });

  return <Layout initialFiles={files} initialFolders={folders} />;
}