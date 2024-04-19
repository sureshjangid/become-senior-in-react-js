export const logProps = Component =>{
    return (props)=>{
        console.log(props,'props');
        return <Component {...props}/> 
    }
} 