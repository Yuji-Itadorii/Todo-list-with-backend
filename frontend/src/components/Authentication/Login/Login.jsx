import React, { useContext, useState } from 'react';
import { LockOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Form, Input, Space } from 'antd';
import "./Login.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../../UserContext/UserContext';


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    // const user = useContext(UserContext);

    const onFinish = (e) => {

        const data = {
            email, password
        };


        axios.post('http://localhost:3000/api/login', data, {
            withCredentials: true
        }).then((res) => {
            navigate('/');
        }
        ).catch((err) => {
            console.log(err);
        })
    };
    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Username!',
                    },
                ]}
            >
                <Input prefix={<SettingOutlined className="site-form-item-icon" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="username: admin or user" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]}
            >
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password: ant.design"
                />
            </Form.Item>
            <Form.Item>
                <Space style={{
                    display: 'flex',
                    flexDirection: "column",
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Button type="primary" htmlType="submit" className="login-form-button-1">
                        Sign in
                    </Button>

                </Space>

            </Form.Item>
        </Form>
    );
};
export default Login;