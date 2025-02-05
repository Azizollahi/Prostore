import type { Metadata } from "next";
import {
  Instrument_Serif,
  // Inter
} from "next/font/google";
import "@/assets/styles/globals.css";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "@/lib/constants";
import { ThemeProvider } from 'next-themes'
import { Toaster } from "@/components/ui/toaster";
// const inter = Inter({ subsets: ['latin'] })
const instumentSerif = Instrument_Serif({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: `${APP_NAME}`,
  description: `${APP_DESCRIPTION}`,
  metadataBase: new URL(`${SERVER_URL}`)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        // className={`${inter.className}  antialiased`
        className={`${instumentSerif.className}  antialiased`
        }
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
