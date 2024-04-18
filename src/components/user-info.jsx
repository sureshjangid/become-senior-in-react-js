
const UserInfo = ({data}) => {
const {name,username,phone} = data[0] 
console.log(data,'asdfasdf');
  return (
   
    <>
    <h2>Name: {name}</h2>
    <p> UserName : {username}</p>
    <p> Phone : {phone}</p>

    </>
  )
}

export default UserInfo