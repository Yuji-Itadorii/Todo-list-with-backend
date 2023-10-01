import React from 'react'
import "./Home.css"
import { Card, Space } from 'antd';
import LoginSignUp from './LoginSignUp';

const Home = () => {
    return (
        <div className='home-container'>

            <Space direction='vertical' className='login-card' >

                <Card
                    title=""
                    bordered={false}
                >
                    <LoginSignUp />
                </Card>
            </Space>

        </div>
    )
}

export default Home