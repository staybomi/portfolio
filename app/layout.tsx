import type { Metadata } from "next";
import { Poppins, Space_Mono, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const notoKR = Noto_Sans_KR({
  variable: "--font-noto-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "박서영 · Frontend Developer",
  description:
    "사용자 경험을 코드로 구현하는 프론트엔드 개발자 박서영의 포트폴리오. 프로젝트, 기술, 연락처를 확인하세요.",
  keywords: ["박서영", "프론트엔드 개발자", "Frontend Developer", "React", "Next.js", "포트폴리오"],
  authors: [{ name: "박서영" }],
  openGraph: {
    title: "박서영 · Frontend Developer",
    description: "사용자 경험을 코드로 구현하는 프론트엔드 개발자 박서영의 포트폴리오.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${poppins.variable} ${spaceMono.variable} ${notoKR.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <SmoothScroll>
          <Nav />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
