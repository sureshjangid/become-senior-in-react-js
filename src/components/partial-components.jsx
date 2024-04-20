 export const partialComponents = (Componet,partialProps)=>{
    return (props)=>{
        return <Componet {...partialProps} {...props}/>
    }
 }

 export const Button = ({size=34,color,onClick,text,...props})=>{
    return (
        <>
        <button onClick={onClick}
        style={{fontSize:`${size}px`,backgroundColor:color}}>
{text} 

        </button>
        </>
    )
}

const onClickAlert = ()=>{
    alert('hello ')
}
export const RedButton = partialComponents(Button,{color:'red',onClick:onClickAlert})
export const RedSmallButton = partialComponents(RedButton,{size:'16'})
export const GreenSmallButton = partialComponents(Button,{size:'16',color:'green'})