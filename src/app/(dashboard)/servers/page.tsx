import { spinUpDockerContainer } from "@/actions/spinUpDockerContainer";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function () {
  const { userId } = auth();

  if (!userId) {
    // if the user is not logged in,
    // Redirecting the user back to the landing page
    redirect("/");
  }

  return (
    <>
      <form
        action={spinUpDockerContainer}
        className="grid h-[76svh] w-screen place-items-center"
      >
        <button type="submit" className="bg-blue-300 p-4 shadow rounded">START MINECRAFT SERVER</button>
      </form>
    </>
  );
}
