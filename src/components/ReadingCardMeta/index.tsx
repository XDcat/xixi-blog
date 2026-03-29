import React from 'react';

type Props = {
  tags: string[];
  source: string;
  dateRead: string;
};

export default function ReadingCardMeta({tags, source, dateRead}: Props) {
  return (
    <section style={{margin: '1rem 0 2rem', padding: '1.1rem 1.2rem', borderRadius: 18, background: 'linear-gradient(180deg, var(--ifm-card-background-color) 0%, rgba(124,92,255,0.06) 100%)', border: '1px solid var(--ifm-color-emphasis-200)', boxShadow: '0 8px 30px rgba(0,0,0,0.08)'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'center'}}>
        <div style={{display: 'grid', gap: 10}}>
          <div style={{fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.7}}>阅读卡片元信息区</div>
          <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
            {tags.map((tag) => (
              <span key={tag} style={{fontSize: 12, padding: '0.3rem 0.7rem', borderRadius: 999, background: 'rgba(124,92,255,0.15)', color: 'var(--ifm-font-color-base)'}}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div style={{display: 'grid', gap: 8, textAlign: 'right'}}>
          <div style={{fontSize: 13, opacity: 0.8}}>阅读日期：{dateRead}</div>
          <div style={{fontSize: 13}}>原文链接：<a href={source} target="_blank" rel="noreferrer">打开原文</a></div>
        </div>
      </div>
    </section>
  );
}
