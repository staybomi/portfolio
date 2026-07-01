import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 포트폴리오는 정적 자산 위주라 별도 이미지 최적화 서버(sharp) 없이도 동작하도록 처리
  images: { unoptimized: true },
  // 상위 디렉터리의 다른 lockfile 때문에 워크스페이스 루트가 잘못 잡히는 것을 방지
  turbopack: { root: import.meta.dirname },
};

export default nextConfig;
