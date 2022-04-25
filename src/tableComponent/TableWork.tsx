import { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Table, Modal, Input, Button } from "antd";
import AddEmployee from "./AddEmployee";









function TableWork() {
    const [isEditing, setIsEditing] = useState(false);
    const [editingStudent, setEditingStudent] = useState<User | null>(null);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState({});
    interface User {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        contactNumber: string;
        age: number;
        address: string;
    }
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'FirstName',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'LastName',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'ContactNumber',
            dataIndex: 'contactNumber',
            key: 'contactNumber',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            key: "5",
            title: "Actions",
            render: (record: User) => {
                return (
                    <>
                        <EditOutlined
                            onClick={() => {
                                onEditStudent(record);
                            }}
                        />
                        <DeleteOutlined
                            onClick={() => {
                                onDeleteStudent(record);
                            }}
                            style={{ color: "red", marginLeft: 12 }}
                        />
                    </>
                );
            },
        },
    ];

    const onDeleteStudent = (record: User) => {
        Modal.confirm({
            title: "Are you sure, you want to delete this student record?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setUsers((pre: any) => {
                    return pre.filter((user: User) => user.id !== record.id);
                });
            },
        });
    };

    const onEditStudent = (record: User) => {
        setIsEditing(true);
        setEditingStudent({ ...record });
    };
    const resetEditing = () => {
        setIsEditing(false);
        setEditingStudent(null);
    };


    useEffect(() => {
        const axios = require("axios");
        const options = {
            method: "GET",

            url: "https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001/",

            headers: {
                "X-RapidAPI-Host": "fairestdb.p.rapidapi.com",

                "X-RapidAPI-Key": "SIGN-UP-FOR-KEY",
            },
        };

        axios
            .request(options)
            .then(function (response: { data: any }) {
                console.log("setting data work", response.data);

                setUsers(response.data);
            })
            .catch(function (error: any) {
                console.error(error);
            });
    }, []);

    return (
        <div className="App">

            <AddEmployee />

            <Table dataSource={users} columns={columns} />

            <Modal
                title="Edit Student"
                visible={isEditing}
                okText="Save"
                onCancel={() => {
                    resetEditing();
                }}
                onOk={() => {
                    setUsers((pre: any) => {
                        return pre.map((user: User) => {
                            if (user.id === (editingStudent && editingStudent.id)) {
                                return editingStudent;
                            } else {
                                return user;
                            }
                        });
                    });
                    resetEditing();
                }}
            >
                <Input
                    value={editingStudent?.firstName}
                    onChange={(e) => {
                        setEditingStudent((pre: any) => {
                            return { ...pre, firstName: e.target.value };
                        });
                    }}
                />
                <Input
                    value={editingStudent?.email}
                    onChange={(e) => {
                        setEditingStudent((pre: any) => {
                            return { ...pre, email: e.target.value };
                        });
                    }}
                />
                <Input
                    value={editingStudent?.address}
                    onChange={(e) => {
                        setEditingStudent((pre: any) => {
                            return { ...pre, address: e.target.value };
                        });
                    }}
                />
            </Modal>
        </div>
    );
}

export default TableWork;
