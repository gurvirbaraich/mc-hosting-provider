import { cn } from "@/lib/cn";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ConnectionRecord } from "@/xata";
import { getContainerStatus } from "@/actions/getContainerStatus";
import { stopDockerContainer } from "@/actions/stopDockerContainer";
import { spinUpDockerContainer } from "@/actions/spinUpDockerContainer";

export default async function () {
  const { userId } = auth();
  const runningContainer: ConnectionRecord | null = await getContainerStatus();

  if (!userId) {
    // if the user is not logged in,
    // Redirecting the user back to the landing page
    redirect("/");
  }

  return (
    <>
      <form
        action={!runningContainer ? spinUpDockerContainer : stopDockerContainer}
        className="grid h-[76svh] w-screen place-items-center"
      >
        <button
          type="submit"
          className={cn(
            "rounded p-4 shadow",
            !runningContainer ? "bg-blue-300" : "bg-red-400",
          )}
        >
          {runningContainer ? "STOP" : "START"} MINECRAFT SERVER
        </button>
      </form>
    </>
  );
}
