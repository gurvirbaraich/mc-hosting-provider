import NavigationBar from "@/components/NavigationBar"

export default function UserPanel({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <NavigationBar />

      <main>
        {children}
      </main>
    </>
  );
}
