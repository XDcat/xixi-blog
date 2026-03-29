import React from 'react';

type Props = {
  readTime: string;
  tags: string[];
  source: string;
  dateRead: string;
};

export default function ReadingCardMeta({readTime, tags, source, dateRead}: Props) {
  return (
    <section style={{margin: '1.5rem 0 2rem', padding: '1rem 1.2rem', borderRadius: 16, background: 'var(--ifm-card-background-color)', border: '1px solid var(--ifm-color-emphasis-200)'}}>
      <div style={{display: 'grid', gap: 10}}>
        <div style={{display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center'}}>
          <span style={{fontSize: 13, opacity: 0.75}}>阅读时间：{readTime}</span>
          <span style={{fontSize: 13, opacity: 0.75}}>阅读日期：{dateRead}</span>
        </div>
        <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
          {tags.map((tag) => (
            <span key={tag} style={{fontSize: 12, padding: '0.25rem 0.6rem', borderRadius: 999, background: 'var(--ifm-color-emphasis-200)'}}>
              {tag}
            </span>
          ))}
        </div>
        <div style={{fontSize: 13}}>
          原文链接：<a href={source} target="_blank" rel="noreferrer">{source}</a>
        </div>
      </div>
    </section>
  );
}
