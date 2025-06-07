import React from 'react'
import { CiUser } from "react-icons/ci";

const Title = ({ name }) => {
    return (
        <div style={{ fontSize: '30px', padding: '5px', margin: '5px', borderBottom: '0px solid black', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CiUser />
            <p style={{ fontSize: '15px' }}>{name ? name : '?'}</p>
        </div>
    )
}

export default Title
