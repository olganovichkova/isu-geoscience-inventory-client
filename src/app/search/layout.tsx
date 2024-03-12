export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col flex-wrap items-center justify-stretch p-8 sm:p-16">
      <div className="w-full">{children}</div>
    </div>
  );
}
