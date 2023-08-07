import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "GithView",
  description: "sync with your github account easily using GithView",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins}>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="relative">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
