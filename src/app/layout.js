import "./globals.css"
import { Providers } from "./providers";

export const metadata = {
  title: "Maze",
  description: "Maze solver",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
