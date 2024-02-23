import { getXataClient } from "@/xata";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const getContainerStatus = async function () {
  "use server";

  const { userId } = auth();
  const client = getXataClient();

  if (!userId) {
    // if the user is not logged in,
    // Redirecting the user back to the landing page
    redirect("/");
  }

  // Getting the linked container
  const [runningContainer] = await client.db.connection
  .filter({
    userID: userId,
  })
  .getAll();

  return runningContainer ?? null;  
};
