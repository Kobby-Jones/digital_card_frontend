import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import NeonPattern from "@/components/neon-pattern";
import { ClientsProvider } from "@/context/clients-context";
import { ToastProvider } from "@/components/ui/toast";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/auth-context";

export const metadata: Metadata = {
  title: "PrepGo.me — Digital Business Card SaaS",
  description: "Create neon-glass portfolios with QR codes for your clients."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <NeonPattern />
          <ToastProvider>
            <AuthProvider>
              <ClientsProvider>
                <Navbar />
                <main className="mx-auto max-w-7xl px-4 py-10">
                  {children}
                </main>
                <Footer />
              </ClientsProvider>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
