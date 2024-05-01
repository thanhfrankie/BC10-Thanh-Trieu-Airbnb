import React from "react";
import { Modal, Button, Form, Input, message, Row, Col, Select } from "antd";
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";

const { Option } = Select;

const EditUserModal = ({ visible, onCancel, onFinish, userData }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Sửa thông tin người dùng"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>Hủy</Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>Cập nhật</Button>,
      ]}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={userData}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Tên"
              rules={[
                { required: true, message: "Vui lòng nhập tên người dùng." },
                { pattern: /^[^\d]+$/, message: "Tên không được chứa chữ số." },
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
          {/* Thêm các trường khác tương tự */}
        </Row>
      </Form>
    </Modal>
  );
};

export default EditUserModal;
