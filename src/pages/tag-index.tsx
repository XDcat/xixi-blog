import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function TagIndex() {
  const tags = [
    {label: 'AI', href: '/tags/ai'},
    {label: 'Agent', href: '/tags/agent'},
    {label: 'Workflow', href: '/tags/workflow'},
    {label: 'Harness', href: '/tags/harness'},
    {label: 'Long-running', href: '/tags/long-running'},
  ];

  return (
    <Layout title="标签索引" description="阅读卡片的主题索引。">
      <main className="container margin-vert--xl">
        <h1>标签索引</h1>
        <div style={{display: 'flex', gap: 12, flexWrap: 'wrap'}}>
          {tags.map((tag) => (
            <Link key={tag.label} className="button button--primary button--outline" to={tag.href}>
              {tag.label}
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}
