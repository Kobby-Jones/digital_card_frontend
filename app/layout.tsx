import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import NeonPattern from "@/components/neon-pattern";
import { ClientsProvider } from "@/context/clients-context";
import { ToastProvider } from "@/components/ui/toast";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/auth-context";
import { ThemePresetProvider } from "@/context/theme-context";

export const metadata: Metadata = {
  title: "PrepGo.me — Neon Business Websites with QR",
  description: "Create a stunning neon-glass business website with a unique URL and QR code."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="neon">{/* SSR default */}
      <head>
        {/* Set theme ASAP before React hydrates to avoid a black/white flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var t = localStorage.getItem('digi_theme') || 'neon';
    document.documentElement.setAttribute('data-theme', t);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'neon');
  }
})();
`
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ThemePresetProvider>
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
          </ThemePresetProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
