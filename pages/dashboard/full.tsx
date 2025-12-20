import { useEffect,useState } from 'react';
import dynamic from 'next/dynamic';
const Kanban = dynamic(()=>import('../../components/kanban/Kanban'),{ssr:false});
const Graph = dynamic(()=>import('../../components/graph/Graph'),{ssr:false});
import { createPDF } from '../../utils/pdf/generate';
import { createExcel } from '../../utils/excel/generate';
export default function FullDashboard(){
  const [transfers,setTransfers]=useState([]); const [tasks,setTasks]=useState([]);
  useEffect(()=>{
    fetch('/api/real/all').then(r=>r.json()).then(d=>setTransfers(d.transfers));
    fetch('/api/approval/tasks').then(r=>r.json()).then(d=>setTasks(d.tasks));
  },[]);
  const handleTaskUpdate=(taskId,status)=>{
    fetch("$SLACK_WEBHOOK",{method:'POST',body:JSON.stringify({text:`Task ${taskId} updated to ${status}`})});
    createPDF(tasks); createExcel(tasks);
  };
  return <div><h2>FULL DASHBOARD (Hobby版)</h2><Kanban tasks={tasks} onTaskMove={(t)=>handleTaskUpdate(t.id,t.status)}/><Graph transfers={transfers}/></div>;
}
