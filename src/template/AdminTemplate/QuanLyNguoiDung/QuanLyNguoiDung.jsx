import React, { useState, useEffect } from "react";
import { message as antdMessage, Radio } from "antd";
import moment from "moment";
import { Modal, Button, Form, Input, Row, Col, Table, Tag, Select } from "antd";
import "./QuanLyNguoiDung.scss";
import { http } from "../../../services/config";
import {
  FormOutlined,
  MailOutlined,
  PhoneOutlined,
  SafetyOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Option } = Select;

const QuanLyNguoiDung = () => {
  const [usersData, setUsersData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [form] = Form.useForm();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchData();
  }, [pageIndex, pageSize]);

  const fetchData = async () => {
    try {
      const [responseUsers, responseAdditional] = await Promise.all([
        http.get(`/users`),
        http.get(`/users/phan-trang-tim-kiem`, {
          params: {
            pageIndex,
            pageSize,
          },
        }),
      ]);

      const usersData = responseUsers.data.content;
      const additionalData = responseAdditional.data.content.data;

      const mergedData = usersData.map((user) => {
        const additionalInfo = additionalData.find(
          (item) => item.id === user.id
        );
        return {
          ...user,
          avatar: additionalInfo ? additionalInfo.avatar : "",
          password: additionalInfo ? additionalInfo.password : "",
          phone: additionalInfo ? additionalInfo.phone : "",
        };
      });

      setUsersData(mergedData);
      setTotal(responseAdditional.data.content.totalRow);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const handleOpenModal = () => setVisible(true);
  const handleCloseModal = () => {
    setVisible(false);
    form.resetFields();
    setEditingUser(null);
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(true);
  };

  const onFinish = async (values) => {
    try {
      if (editingUser) {
        const response = await http.put(`/users/${editingUser.id}`, values);
        if (response.status === 200) {
          antdMessage.success("Cập nhật thành công!");
          form.resetFields();
          setVisible(false);
          setEditingUser(null);
          fetchData();
        } else {
          antdMessage.error("Đã có lỗi xảy ra khi cập nhật người dùng.");
        }
      } else {
        const response = await http.post("/users", values);
        if (response.status === 200) {
          antdMessage.success("Thêm thành công!");
          form.resetFields();
          setVisible(false);
          fetchData();
        } else {
          antdMessage.error("Thêm người dùng không thành công");
        }
      }
    } catch (error) {
      console.error("Lỗi khi thêm/cập nhật người dùng:", error);
      antdMessage.error("Đã có lỗi xảy ra khi thêm/cập nhật người dùng.");
    }
  };

  const handleDetail = (record) => {
    setDetailData(record);
    setDetailVisible(true);
  };

  const handleEdit = (record) => {
    setEditingUser(record);
    form.setFieldsValue({
      ...record,
      gender: record.gender ? true : false,
    });
    setVisible(true);
  };

  const handleDelete = async (record) => {
    try {
      const response = await http.delete(`/users?id=${record.id}`);
      if (response.status === 200) {
        antdMessage.success("Xoá người dùng thành công!");
        setUsersData(usersData.filter((user) => user.id !== record.id));
      } else {
        antdMessage.error("Xoá người dùng không thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi xoá người dùng:", error);
      antdMessage.error("Đã có lỗi xảy ra khi xoá người dùng.");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id) => <span style={{ fontWeight: "bold" }}>{id}</span>,
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={avatar}
            alt=""
            style={{ width: "60px", height: "60px", marginRight: "5px" }}
          />
        </div>
      ),
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <span style={{ fontWeight: "bold", color: "#008080" }}>{name}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => (
        <span style={{ textDecoration: "underline" }}>{email}</span>
      ),
    },
    {
      title: "Mật khẩu",
      dataIndex: "password",
      key: "password",
      render: (password) => (
        <span style={{ fontWeight: "bold", color: "#006400" }}>{password}</span>
      ),
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
      render: (birthday) => (
        <span style={{ color: "#CD950C" }}>
          {moment(birthday).format("DD/MM/YYYY")}
        </span>
      ),
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => (
        <span>
          {gender ? (
            <span style={{ fontWeight: "bold", color: "seagreen" }}>Nam</span>
          ) : (
            <span style={{ fontWeight: "bold", color: "magenta" }}>Nữ</span>
          )}
        </span>
      ),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "USER" ? "geekblue" : "volcano"} key={role}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <span>
          <Button
            className="ml-1"
            type="default"
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Button
            className=" ml-1 mb-1 mt-1"
            type="default"
            onClick={() => handleDelete(record)}
          >
            Xoá
          </Button>
          <Button
            className="ml-1"
            type="default"
            onClick={() => handleDetail(record)}
          >
            Xem chi tiết
          </Button>
        </span>
      ),
    },
  ];

  const handleTableChange = (pagination) => {
    setPageIndex(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const filteredUsersData = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="">
      <div>
        <Button type="primary" onClick={handleOpenModal}>
          <i className="fa-regular fa-circle-plus mr-1"></i> Thêm Quản Trị Viên
        </Button>

        <Modal
          title={editingUser ? "Chỉnh sửa thông tin" : "Thêm Quản Trị Viên"}
          visible={visible}
          onCancel={handleCloseModal}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Hủy
            </Button>,
            <Button key="submit" type="primary" onClick={() => form.submit()}>
              {editingUser ? "Cập nhật" : "Thêm"}
            </Button>,
          ]}
        >
          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
            initialValues={{ remember: true }}
          >
            <Row gutter={[16, 0]}>
              <Col span={12}>
                <Form.Item name="id" label="ID Người Dùng">
                  <Input disabled placeholder="ID" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Tên"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên người dùng!",
                    },
                  ]}
                >
                  <Input prefix={<FormOutlined />} placeholder="Tên" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 0]}>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Vui lòng nhập email!" },
                    { type: "email", message: "Email không hợp lệ!" },
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại!" },
                  ]}
                >
                  <Input
                    prefix={<PhoneOutlined />}
                    placeholder="Số điện thoại"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 0]}>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="Mật khẩu"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu!" },
                  ]}
                >
                  <Input prefix={<SafetyOutlined />} placeholder="Mật khẩu" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="birthday"
                  label="Ngày sinh"
                  rules={[
                    { required: true, message: "Vui lòng nhập ngày sinh!" },
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder=" Ngày sinh" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="gender"
                  label="Giới tính"
                  rules={[
                    { required: true, message: "Vui lòng chọn giới tính." },
                  ]}
                >
                  <Radio.Group>
                    <Radio value="true">Nam</Radio>
                    <Radio value="false">Nữ</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="role"
                  label="Vai trò"
                  rules={[
                    { required: true, message: "Vui lòng chọn vai trò." },
                  ]}
                >
                  <Select
                    style={{ marginBottom: "10px" }}
                    placeholder="Chọn vai trò"
                  >
                    <Option value="USER">User</Option>
                    <Option value="ADMIN">Admin</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
      <Modal
        title="Chi tiết người dùng"
        visible={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={null}
      >
        <div>
          <p>
            <strong>ID: </strong> {detailData.id}
          </p>
          <p>
            <strong>Avatar: </strong>
            <img
              src={detailData.avatar}
              alt=""
              style={{ width: "150px", height: "150px" }}
            />
          </p>
          <p>
            <strong>Tên: </strong> {detailData.name}
          </p>
          <p>
            <strong>Email: </strong> {detailData.email}
          </p>
          <p>
            <strong>Mật khẩu: </strong> {detailData.password}
          </p>
          <p>
            <strong>Ngày sinh: </strong>{" "}
            {moment(detailData.birthday).format("DD/MM/YYYY")}
          </p>
          <p>
            <strong>Số điện thoại: </strong> {detailData.phone}
          </p>
          <p>
            <strong>Giới tính: </strong> {detailData.gender ? "Nam" : "Nữ"}
          </p>
          <p>
            <strong>Vai trò: </strong> {detailData.role}
          </p>
        </div>
      </Modal>

      <div className="search-container mt-4">
        <Input.Search
          placeholder="Nhập tên để tìm kiếm..."
          enterButton
          style={{ width: "100%" }}
          onSearch={(value) => setSearchKeyword(value)}
        />
      </div>
      <div className="table-container mt-4">
        <Table
          columns={columns}
          dataSource={filteredUsersData}
          pagination={{
            current: pageIndex,
            pageSize: pageSize,
            total: total,
            onChange: (page, pageSize) => {
              setPageIndex(page);
              setPageSize(pageSize);
            },
          }}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default QuanLyNguoiDung;
