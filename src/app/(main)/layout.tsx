import type { Metadata } from "next";

import Sidebar from "@/components/Sidebar/Sidebar";
import Dashboard from "@/components/Dashboard/Dashboard";
import { Providers } from "@/redux/providers/Provider";

export const metadata: Metadata = {
  title: "Nuum",
  description: "Nuum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <div className="flex h-screen">
        <aside className="w-64 min-w-64 bg-gray-800">
          <Sidebar />
        </aside>
        <main className="flex-1 overflow-auto ">
          <Dashboard />
          {children}
        </main>
      </div>
    </Providers>
  );
}
