import { useState } from 'react'

export default function CreateBehaviorModal({ onAdd }:{ onAdd:(points:number, note:string)=>void }) {
    const [open, setOpen] = useState(false)
    const [points, setPoints] = useState(1)
    const [note, setNote] = useState('')

    return (
        <>
            <button className="button" onClick={()=>setOpen(true)}>Add behavior</button>
            {open && (
                <div className="card" style={{marginTop:8}}>
                    <div className="row">
                        <input className="input" type="number" value={points} onChange={e=>setPoints(parseInt(e.target.value))}/>
                        <input className="input" placeholder="Note" value={note} onChange={e=>setNote(e.target.value)}/>
                        <button className="button" onClick={()=>{ onAdd(points, note); setOpen(false); }}>Save</button>
                        <button className="button" onClick={()=>setOpen(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </>
    )
}