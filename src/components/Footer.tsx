import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Link href="/" className="footer-brand">BALL<span>IQ</span></Link>
        <p>野球を、もっと深く。もっと面白く。</p>
      </div>
      <nav>
        <Link href="/learn">学ぶ</Link>
        <Link href="/stats-lab">指標ラボ</Link>
        <Link href="/drills">技術ドリル</Link>
      </nav>
      <small>掲載データは学習用の架空データです。</small>
    </footer>
  );
}
