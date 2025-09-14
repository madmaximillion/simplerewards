import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

export type Columns = {
    TODO: any[]
    AWAITING_PARENT: any[]
    APPROVED: any[]
}

export default function KanbanBoard({ columns, onMove }:{
    columns: Columns
    onMove: (id:number, toStatus:'TODO'|'AWAITING_PARENT'|'APPROVED')=>void
}) {
    function handleDragEnd(result: DropResult) {
        if (!result.destination) return
        const { source, destination, draggableId } = result
        if (source.droppableId !== destination.droppableId) {
            onMove(parseInt(draggableId), destination.droppableId as any)
        }
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="board">
                {Object.entries(columns).map(([status, items]) => (
                    <Droppable droppableId={status} key={status}>
                        {(provided) => (
                            <div className="column" ref={provided.innerRef} {...provided.droppableProps}>
                                <h3>{status.replace('_',' ')}</h3>
                                {items.map((item, index) => (
                                    <Draggable draggableId={item.id.toString()} index={index} key={item.id}>
                                        {(prov) => (
                                            <div className="card chore" ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}>
                                                {item.title}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    )
}