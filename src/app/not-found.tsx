import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} style={{ padding: "120px 24px" }}>
      <h1>페이지를 찾을 수 없습니다.</h1>
      <Link href="/">홈으로 돌아가기</Link>
    </main>
  );
}
