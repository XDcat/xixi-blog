import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Home() {
  return (
    <Layout title="臭喜喜的笔记本" description="一个现代化的知识博客。">
      <main className="hero hero--primary" style={{padding: '5rem 0'}}>
        <div className="container">
          <h1 className="hero__title">臭喜喜的笔记本</h1>
          <p className="hero__subtitle" style={{maxWidth: 720}}>
            记录 AI、工程、思考和那些值得反复咀嚼的长文。
          </p>
          <div style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
            <Link className="button button--secondary button--lg" to="/blog">
              进入 Blog
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}
