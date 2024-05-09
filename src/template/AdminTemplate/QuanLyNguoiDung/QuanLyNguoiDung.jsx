import React, { useState, useEffect } from "react";
import { DatePicker, message as antdMessage } from "antd";
import moment from "moment";
import {
  Modal,
  Button,
  Form,
  Input,
  message,
  Row,
  Col,
  Table,
  Tag,
  Select,
} from "antd";
import "./QuanLyNguoiDung.scss";
import { http } from "../../../services/config";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
  SmileOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { TextArea, Search } = Input;

const QuanLyNguoiDung = () => {
  const [usersData, setUsersData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [form] = Form.useForm();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await http.get("/users");
      setUsersData(response.data.content);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpenModal = () => setVisible(true);
  const handleCloseModal = () => {
    setVisible(false);
    form.resetFields();
    setEditingUser(null); // Reset thông tin người dùng đang chỉnh sửa khi đóng popup
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(true);
  };

  const onFinish = async (values) => {
    try {
      if (editingUser) {
        // Nếu có người dùng đang được chỉnh sửa
        const response = await http.put(`/users/${editingUser.id}`, values); // Gửi yêu cầu cập nhật thông tin người dùng
        if (response.status === 200) {
          antdMessage.success("Cập nhật thành công!");
          form.resetFields();
          setVisible(false);
          setEditingUser(null); // Reset thông tin người dùng đang chỉnh sửa
          fetchData(); // Load lại dữ liệu sau khi cập nhật thành công
        } else {
          antdMessage.error("Đã có lỗi xảy ra khi cập nhật người dùng.");
        }
      } else {
        const response = await http.post("/users", values);
        if (response.status === 200) {
          antdMessage.success("Thêm thành công!");
          form.resetFields();
          setVisible(false);
          fetchData(); // Load lại dữ liệu sau khi thêm thành công
        } else {
          antdMessage.error("Đã có lỗi xảy ra khi thêm người dùng.");
        }
      }
    } catch (error) {
      console.error("Error adding/updating user:", error);
      antdMessage.error("Đã có lỗi xảy ra khi thêm/cập nhật người dùng.");
    }
  };

  const handleDetail = (record) => {
    setDetailData(record);
    setDetailVisible(true);
  };

  const handleEdit = (record) => {
    setEditingUser(record); // Lưu thông tin người dùng được chỉnh sửa
    form.setFieldsValue(record); // Điền thông tin người dùng được chọn vào form
    setVisible(true); // Hiển thị lại popup thêm quản trị viên
  };

  const handleDelete = async (record) => {
    try {
      const response = await http.delete(`/users?id=${record.id}`);
      if (response.status === 200) {
        antdMessage.success("Xoá người dùng thành công!");
        // Cập nhật danh sách người dùng sau khi xoá thành công
        setUsersData(usersData.filter((user) => user.id !== record.id));
      } else {
        antdMessage.error("Đã có lỗi xảy ra khi xoá người dùng.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      antdMessage.error("Đã có lỗi xảy ra khi xoá người dùng.");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
      render: (birthday) => moment(birthday).format("DD/MM/YYYY"),
    },
    { title: "Mật khẩu", dataIndex: "password", key: "password" },
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
            className="m-1"
            type="default"
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Button
            className=" mb-1"
            type="default"
            onClick={() => handleDelete(record)}
          >
            Xoá
          </Button>
          <Button
            className="ml-2"
            type="default"
            onClick={() => handleDetail(record)}
          >
            Xem chi tiết
          </Button>
        </span>
      ),
    },
  ];

  const filteredUsersData = usersData.filter((user) =>
    user.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="container">
      <div>
        <Button type="primary" onClick={handleOpenModal}>
          <i class="fa-regular fa-circle-plus mr-1"></i> Thêm Quản Trị Viên
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
            <Row gutter={[16, 16]}>
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
                      message: "Vui lòng nhập tên người dùng.",
                    },
                    {
                      pattern: /^[^\d]+$/,
                      message: "Tên không được chứa chữ số.",
                    },
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Tên" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: "Vui lòng nhập địa chỉ email." },
                    { type: "email", message: "Email không hợp lệ." },
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="birthday"
                  label="Ngày sinh"
                  rules={[
                    { required: true, message: "Vui lòng nhập ngày sinh." },
                    {
                      pattern: /^[0-9/]+$/,
                      message: "Nhập số theo định dạng DD/MM/YYYY",
                    },
                    {
                      validator: (_, value) => {
                        if (value && value.length >= 8 && value.length <= 10) {
                          const parts = value.split("/");
                          if (
                            parts.length === 3 &&
                            parts[2].length === 4 &&
                            !isNaN(parts[2])
                          ) {
                            return Promise.resolve();
                          }
                        }
                        return Promise.reject(new Error("Ngày sinh chưa đúng"));
                      },
                    },
                  ]}
                >
                  <Input prefix={<SmileOutlined />} placeholder="Ngày sinh" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại." },
                    {
                      pattern: /^[0-9()+\-\s]+$/,
                      message: "Số điện thoại chỉ được nhập số.",
                    },
                  ]}
                >
                  <Input
                    prefix={<PhoneOutlined />}
                    placeholder="Số điện thoại"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="Mật khẩu"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu." },
                    {
                      min: 6,
                      max: 20,
                      message: "Mật khẩu phải từ 6 đến 20 kí tự.",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Mật khẩu"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
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
            <strong>Vai trò: </strong> {detailData.role}
          </p>
        </div>
        
      </Modal>
      
      <div className="search-container mt-4">
        <Input.Search
          placeholder="Nhập từ khóa để tìm kiếm..."
          enterButton
          style={{ width: "100%" }}
          onSearch={(value) => setSearchKeyword(value)}
        />
      </div>
      <div className="table-container mt-4">
        <Table columns={columns} dataSource={filteredUsersData} />
      </div>
    </div>
  );
};

export default QuanLyNguoiDung;
