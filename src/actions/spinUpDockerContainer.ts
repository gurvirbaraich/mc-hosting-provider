import { auth } from "@clerk/nextjs";
import { getXataClient } from "@/xata";

import { spawn } from "child_process";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getContainerStatus } from "@/actions/getContainerStatus";

export const spinUpDockerContainer = async function (formData: FormData) {
  "use server";

  const { userId } = auth();
  const client = getXataClient();

  if (!userId) {
    // if the user is not logged in,
    // Redirecting the user back to the landing page
    redirect("/");
  }

  // Abort
  // if ther user has already created a container
  if (await getContainerStatus()) {
    return;
  }

  // Spinning up a docker container
  const command = spawn("docker", [
    "run",
    "-d",                                     // Run container in background.
    "--rm",                                   // Automatically removes the container when it exits.
    "-e",
    "EULA=TRUE",
    "itzg/minecraft-server",
  ]);

  for await (const chunk of command.stdout) {
    // Getting the containerID from the stdout of the console.
    const serverID = chunk.toString().trim().slice(0, 11);

    // Link the container to the logged in user.
    await client.db.connection.create({
      userID: userId,
      serverID: serverID,
    });

    revalidatePath("/servers");
  }
};
