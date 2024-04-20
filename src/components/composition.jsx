export const Button = ({size=34,color,onClick,text,...props})=>{
    console.log(props,'propsprops')
    return (
        <>
        <button onClick={onClick}
        style={{fontSize:`${size}px`,backgroundColor:color}}>
{text} {props.name}

        </button>
        </>
    )
}

export const RedButton = (props)=>{
    return <Button {...props} color={'red'} />
}


export const GreenSamillButton = (props)=>{
    const alrtBox = ()=>{
        alert('hello from green')
    }
    return <Button {...props} onClick={alrtBox} color={'green'} size={'16'}/>
}