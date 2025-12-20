import React from 'react';
export default function Kanban({tasks=[], onTaskMove=(t)=>{}}){return <div>{tasks.map(t=><div key={t.id}>{t.title}</div>)}</div>;}
