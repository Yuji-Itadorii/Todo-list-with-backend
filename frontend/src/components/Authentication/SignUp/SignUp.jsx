import React, { useState } from 'react';
import { LockOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import "./SignUp.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const onFinish = (values) => {

        const data = {
            email, password
        };

        axios.post('http://localhost:3000/api/register', data, {
            withCredentials: true
        }).then((res) => {
            // user.setEmail(res.data.email);
            navigate('/');
        }
        ).catch((err) => {
            console.log(err);
        })
    };
    return (
        <Form
            name="normal_signup"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your Email!',
                    },
                ]}
            >
                <Input type='email' prefix={<MailOutlined className="site-form-item-icon" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email: mentoraide@gmail" />
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
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox >Remember me</Checkbox>
                </Form.Item>


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
export default SignUp;