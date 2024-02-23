import { ConnectionRecord } from "@/xata";
import { revalidatePath } from "next/cache";

import { spawn } from "child_process";
import { getContainerStatus } from "@/actions/getContainerStatus";

export const stopDockerContainer = async function () {
  "use server";

  // Fetching the currently running container.
  const runningContainer: ConnectionRecord | null = await getContainerStatus();

  if (!runningContainer) {
    // Abort immediately
    // if no container is currently running
    return;
  }

  try {
    const command = spawn("docker", [
      "rm",
      "-f",
      <string>runningContainer.serverID,
    ]);

    for await (const chunk of command.stdout) {
      // Deleting the container from the server.
      await runningContainer.delete();

      // Revalidating the website contents
      revalidatePath("/servers");
    }

    return true;
  } catch (err) {
    console.log(err);
  }
};
