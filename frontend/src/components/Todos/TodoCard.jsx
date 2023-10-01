import React from 'react'
import { Button, Card, Space, Typography } from 'antd';

import axios from 'axios'

const TodoCard = ({ data }) => {

    const handleOndelete = async (id) => {
        const alltokens = document.cookie;
        const token = alltokens.split('=')[1];
        // console.log(token)

        const data = {
            token: token,
            id: id
        }

        const res = await axios.delete(`http://localhost:3000/api/todos/${id}`, { data: data })

        window.location.reload()
    }

    const handleOnMark = async (id, done, text) => {
        const alltokens = document.cookie;
        const token = alltokens.split('=')[1];
        // console.log(token)

        const data = {
            token: token,
            text: text,
            done: !done
        }

        const res = await axios.put(`http://localhost:3000/api/todos/${id}`, data)

        window.location.reload()
    }



    return (
        <>
            <Card title={data.text} bordered={false} style={{ width: 300 }}>
                <Typography.Text type="secondary"
                    style={{
                        color: data.done ? "green" : "red",
                    }}
                >Status: {data.done ? "Done" : "Not Done"}</Typography.Text>
                <Space size="middle" direction='horizontal'
                    style={{
                        marginTop: "10px"
                    }}
                >
                    <Button type="primary"
                        onClick={() => {
                            // console.log(data._id)
                            handleOndelete(data._id)
                        }}
                    >Delete</Button>

                    <Button type="primary"
                        onClick={() => {
                            // console.log(data._id)
                            handleOnMark(data._id, data.done, data.text)
                        }
                        }
                    >{data.done ? "Mark as Unone" : "Mark as Done"}</Button>
                </Space>
            </Card>
        </>
    )
}

export default TodoCard