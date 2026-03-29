import React from 'react';

type Props = {
  type?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  children: React.ReactNode;
};

const colors = {
  info: '#3b82f6',
  success: '#22c55e',
  warning: '#f59e0b',
  danger: '#ef4444',
};

export default function Callout({type = 'info', title, children}: Props) {
  return (
    <div style={{borderLeft: `4px solid ${colors[type]}`, padding: '1rem 1rem 1rem 1.25rem', margin: '1.5rem 0', borderRadius: 12, background: 'var(--ifm-card-background-color)'}}>
      {title ? <div style={{fontWeight: 700, marginBottom: 8}}>{title}</div> : null}
      <div>{children}</div>
    </div>
  );
}
