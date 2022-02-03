export default function Empty({width,height,msg}:{width?:number,height?:number,msg:string}) {
    return (
        <div className='empty' style={{width,height}}>
            <i className="fas fa-box-open"></i>
            <strong>{msg}</strong>
        </div>
    )
}