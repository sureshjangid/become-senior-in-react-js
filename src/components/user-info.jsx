import React from 'react'
import { useCurrentUser } from './custom-user.hook'

const UserInfo = () => {
    const user = useCurrentUser();
    const { name, username, phone } = user || {}// Provide an empty object as default value
    return (
        <div>
            {user ? (
                <>
                    <div>Name: {name}</div>
                    <div>User Name: {username}</div>
                    <div>Phone: {phone}</div>
                </>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default UserInfo
