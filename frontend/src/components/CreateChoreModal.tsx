import { useState } from 'react'

export type ChoreInput = {
    title: string
    description?: string
    scheduleType: 'DAILY'|'WEEKLY'
    expiresEndOfPeriod: boolean
    assignedChildId?: number
    rewardType: 'MONEY'|'POINTS'|'TREAT'
    rewardValue: number
    isAdhoc: boolean
    dueDate?: string
}

export default function CreateChoreModal({ onCreate }:{
    onCreate: (c: ChoreInput)=>void
}) {
    const [open, setOpen] = useState(false)
    const [form, setForm] = useState<ChoreInput>({
        title: '', scheduleType: 'DAILY', expiresEndOfPeriod: false,
        rewardType: 'POINTS', rewardValue: 1, isAdhoc: false
    } as ChoreInput)

    const update = (k: keyof ChoreInput, v: any) => setForm(f => ({...f, [k]: v}))

    return (
        <>
            <button className="button" onClick={() => setOpen(true)}>New chore</button>
            {open && (
                <div className="card" style={{marginTop:8}}>
                    <div className="row">
                        <input className="input" placeholder="Title" value={form.title} onChange={e=>update('title', e.target.value)} />
                        <select className="input" value={form.scheduleType} onChange={e=>update('scheduleType', e.target.value as any)}>
                            <option value="DAILY">Daily</option>
                            <option value="WEEKLY">Weekly</option>
                        </select>
                        <label><input type="checkbox" checked={form.expiresEndOfPeriod} onChange={e=>update('expiresEndOfPeriod', e.target.checked)} /> Expires</label>
                        <select className="input" value={form.rewardType} onChange={e=>update('rewardType', e.target.value as any)}>
                            <option value="POINTS">Points</option>
                            <option value="MONEY">Money</option>
                            <option value="TREAT">Treat</option>
                        </select>
                        <input className="input" type="number" step="0.5" value={form.rewardValue} onChange={e=>update('rewardValue', parseFloat(e.target.value))}/>
                        <label><input type="checkbox" checked={form.isAdhoc} onChange={e=>update('isAdhoc', e.target.checked)} /> Ad-hoc</label>
                        <button className="button" onClick={() => { onCreate(form); setOpen(false); }}>Create</button>
                        <button className="button" onClick={() => setOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </>
    )
}