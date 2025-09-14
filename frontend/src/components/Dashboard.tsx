import { useEffect, useState } from 'react'
import { api } from '../api'
import KanbanBoard, { Columns } from './KanbanBoard'
import CreateChoreModal, { ChoreInput } from './CreateChoreModal'
import CreateBehaviorModal from './CreateBehaviorModal'

type Summary = {
    behaviorPointsWeek: number
    chorePointsWeek: number
    moneyPending: number
    pointsPending: number
    treatsPending: number
    columns: Columns
}

export default function Dashboard({ uid, role }:{ uid:number, role:'PARENT'|'CHILD' }) {
    const [summary, setSummary] = useState<Summary | null>(null)

    async function load() {
        const { data } = await api.get<Summary>(`/dashboard/child/${uid}/weekly-summary`)
        setSummary(data)
    }

    useEffect(() => { load() }, [])

    async function onMove(id:number, toStatus: 'TODO'|'AWAITING_PARENT'|'APPROVED') {
        if (toStatus === 'AWAITING_PARENT') await api.post(`/chores/${id}/child-mark-done`)
        else if (toStatus === 'APPROVED' && role==='PARENT') await api.post(`/chores/${id}/parent-confirm`)
        else if (toStatus === 'TODO' && role==='PARENT') await api.post(`/chores/${id}/parent-reject`)
        await load()
    }

    async function createChore(input: ChoreInput) {
        await api.post('/chores', { ...input, assignedChildId: uid })
        await load()
    }

    async function addBehavior(points:number, note:string) {
        await api.post('/behavior', { childId: uid, points, note })
        await load()
    }

    if (!summary) return <div>Loading...</div>

    return (
        <div>
            <div className="summary">
                <div className="card"><b>Behavior points:</b> {summary.behaviorPointsWeek}</div>
                <div className="card"><b>Chore points:</b> {summary.chorePointsWeek}</div>
                <div className="card"><b>Pending money:</b> {summary.moneyPending.toFixed(2)}</div>
                <div className="card"><b>Pending points:</b> {summary.pointsPending}</div>
                <div className="card"><b>Pending treats:</b> {summary.treatsPending}</div>
            </div>
            <div className="row" style={{marginBottom:12}}>
                <CreateChoreModal onCreate={createChore}/>
                <CreateBehaviorModal onAdd={addBehavior}/>
            </div>
            <KanbanBoard columns={summary.columns} onMove={onMove}/>
        </div>
    )
}