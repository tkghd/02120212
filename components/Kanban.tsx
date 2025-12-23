import React from 'react'; import { DragDropContext,Droppable,Draggable } from 'react-beautiful-dnd';
export default function Kanban({tasks=[],draggable=false,onTaskMove=(t)=>{}}){
  const handleDragEnd=(r:any)=>{if(!r.destination) return; onTaskMove(r.draggableId);};
  return (<DragDropContext onDragEnd={handleDragEnd}><Droppable droppableId="kanban">{(p)=>(<div ref={p.innerRef} {...p.droppableProps}>{tasks.map((t,i)=><Draggable key={t.id} draggableId={t.id} index={i}>{(p)=><div ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps}>{t.title}</div>}</Draggable>)}{p.placeholder}</div>)}</Droppable></DragDropContext>);
}
