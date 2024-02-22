import { auth } from "@clerk/nextjs";
import { getXataClient } from "@/xata";

import { exec, spawn } from "child_process";
import { redirect } from "next/navigation";

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
  const runningContainers = await client.db.connection
    .filter({
      userID: userId,
    })
    .getAll();

  if (runningContainers.length > 0) {
    return;
  }

  // Spinning up a docker container
  exec(
    "docker run -d -e EULA=TRUE itzg/minecraft-server",
    async (error, stdout: string, stderr: string) => {
      if (error || stderr) {
        return console.log({
          error,
          stderr,
        });
      }

      if (stdout) {
        // Getting the containerID from the stdout of the console.
        const serverID = stdout.trim().slice(0, 11);

        // Link the container to the logged in user.
        await client.db.connection.create({
          userID: userId,
          serverID: serverID,
        });
      }
    },
  );
};
