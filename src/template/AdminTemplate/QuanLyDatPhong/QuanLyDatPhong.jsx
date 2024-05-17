import React, { useState, useEffect } from "react";
import { message as antdMessage } from "antd";
import moment from "moment";
import { Modal, Button, Form, Input, Row, Col, Table } from "antd";
import "../QuanLyNguoiDung/QuanLyNguoiDung.scss";
import { http } from "../../../services/config";
import {
  TrademarkCircleOutlined,
  MergeCellsOutlined,
  MacCommandOutlined,
  TeamOutlined,
  FieldNumberOutlined,
} from "@ant-design/icons";

const QuanLyDatPhong = () => {
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
      const response = await http.get("/dat-phong");
      setUsersData(response.data.content);
    } catch (error) {
      console.error("Error fetching data:", error);
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
        const response = await http.put(`/dat-phong/${editingUser.id}`, values); 
        if (response.status === 200) {
          antdMessage.success("Cập nhật thành công!");
          form.resetFields();
          setVisible(false);
          setEditingUser(null);
          fetchData(); 
        } else {
          antdMessage.error("Đã có lỗi xảy ra khi cập nhật đặt phòng.");
        }
      } else {
        const response = await http.post("/dat-phong", values);
        if (response.status != 200) {
          antdMessage.success("Thêm thành công!");
          form.resetFields();
          setVisible(false);
          fetchData(); 
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
    setEditingUser(record);
    form.setFieldsValue(record);
    setVisible(true);
  };

  const handleDelete = async (record) => {
    try {
      const response = await http.delete(`/dat-phong/${record.id}`);
      if (response.status === 200) {
        antdMessage.success("Xoá đặt phòng thành công!");
        setUsersData(usersData.filter((user) => user.id !== record.id));
      } else {
        antdMessage.error("Đã có lỗi xảy ra khi xoá .");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      antdMessage.error("Đã có lỗi xảy ra khi xoá đặt phòng.");
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
      title: "Mã phòng",
      dataIndex: "maPhong",
      key: "maPhong",
      render: (maPhong) => (
        <span style={{ fontWeight: "bold", color: "#CD5C5C",marginLeft:"30px" }}>{maPhong}</span>
      ),
    },

    {
      title: "Ngày đến",
      dataIndex: "ngayDen",
      key: "ngayDen",
      render: (ngayDen) => (
        <span style={{ color: "green", fontWeight: "bold" }}>
          {moment(ngayDen).format("DD/MM/YYYY")}
        </span>
      ),
    },
    {
      title: "Ngày đi",
      dataIndex: "ngayDi",
      key: "ngayDi",
      render: (ngayDi) => (
        <span style={{ color: " #FF8247", fontWeight: "bold" }}>
          {moment(ngayDi).format("DD/MM/YYYY")}
        </span>
      ),
    },
    {
      title: "Số lượng khách",
      dataIndex: "soLuongKhach",
      key: "soLuongKhach",
      render: (soLuongKhach) => (
        <span style={{ fontWeight: "bold", color: " #9932CC",marginLeft:"30px" }}>
          {soLuongKhach}
        </span>
      ),
    },

    {
      title: "Mã người dùng",
      dataIndex: "maNguoiDung",
      key: "maNguoiDung",
      render: (maNguoiDung) => (
        <span style={{ fontWeight: "bold", color: "#FFB90F" }}>
          {maNguoiDung}
        </span>
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

  const filteredUsersData = usersData.filter(
    (user) =>
      user.maPhong &&
      user.maPhong
        .toString()
        .toLowerCase()
        .includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="container">
      <div>
        <Button type="primary" onClick={handleOpenModal}>
          <i class="fa-regular fa-circle-plus mr-1"></i> Thêm Đặt Phòng
        </Button>

        <Modal
          title={editingUser ? "Chỉnh sửa thông tin" : " Đặt Phòng"}
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
                <Form.Item name="id" label="ID ">
                  <Input disabled placeholder="ID" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="maPhong"
                  label="Mã phòng"
                  rules={[
                    { required: true, message: "Vui lòng nhập mã phòng." },
                    {
                      pattern: /^[0-9()+\-\s]+$/,
                      message: "Chỉ được nhập số.",
                    },
                  ]}
                >
                  <Input
                    prefix={<TrademarkCircleOutlined />}
                    placeholder="Mã phòng"
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="ngayDen"
                  label="Ngày đến"
                  rules={[
                    { required: true, message: "Vui lòng nhập ngày đến." },
                  ]}
                >
                  <Input
                    prefix={<MergeCellsOutlined />}
                    placeholder="Ngày đến"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="ngayDi"
                  label="Ngày đi"
                  rules={[
                    { required: true, message: "Vui lòng nhập ngày đi." },
                  ]}
                >
                  <Input
                    prefix={<MacCommandOutlined />}
                    placeholder="Ngày đi"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="soLuongKhach"
                  label="Số lượng khách"
                  rules={[
                    { required: true, message: "Vui lòng nhập số lượng." },
                    {
                      pattern: /^[0-9()+\-\s]+$/,
                      message: "Chỉ được nhập số.",
                    },
                  ]}
                >
                  <Input
                    prefix={<TeamOutlined />}
                    placeholder="Số lượng khách"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="maNguoiDung"
                  label="Mã người dùng"
                  rules={[
                    { required: true, message: "Vui lòng nhập mã ." },
                    {
                      pattern: /^[0-9()+\-\s]+$/,
                      message: "Chỉ được nhập số.",
                    },
                  ]}
                >
                  <Input
                    prefix={<FieldNumberOutlined />}
                    placeholder="Mã người dùng"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
      <Modal
        title="Chi tiết đặt phòng"
        visible={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={null}
      >
        <div>
          <p>
            <strong>ID: </strong> {detailData.id}
          </p>
          <p>
            <strong>Mã phòng: </strong> {detailData.maPhong}
          </p>
          <p>
            <strong>Ngày đến: </strong>{" "}
            {moment(detailData.ngayDen).format("DD/MM/YYYY")}
          </p>
          <p>
            <strong>Ngày đi: </strong>{" "}
            {moment(detailData.ngayDi).format("DD/MM/YYYY")}
          </p>

          <p>
            <strong>Số lượng khách: </strong> {detailData.soLuongKhach}
          </p>
          <p>
            <strong>Mã người dùng: </strong> {detailData.maNguoiDung}
          </p>
        </div>
      </Modal>
      <div className="search-container mt-4">
        <Input.Search
          placeholder="Nhập mã phòng để tìm kiếm..."
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

export default QuanLyDatPhong;
