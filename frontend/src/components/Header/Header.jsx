import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button } from 'antd'
import './Header.css'
import React from 'react'
import Typography from 'antd/es/typography/Typography'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        axios.get('http://localhost:3000/api/logout', {
            withCredentials: true
        }).then((res) => {
            navigate('/login');
        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <>
            <div className="header-container">
                <Typography className="header-title" level={3}>Todo List</Typography>
                <div className="profile">
                    <Button onClick={handleLogout}>
                        Logout
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Header