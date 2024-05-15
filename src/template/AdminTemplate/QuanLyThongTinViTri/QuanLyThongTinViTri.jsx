import React, { useState, useEffect } from "react";
import { message as antdMessage, Upload } from "antd";
import { Modal, Button, Form, Input, message, Row, Col, Table } from "antd";
import "../QuanLyNguoiDung/QuanLyNguoiDung.scss";
import { http } from "../../../services/config";
import {
  ShopOutlined,
  GlobalOutlined,
  UploadOutlined,
  EnvironmentOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { getToken } from "../../../services/authService"; // Import hàm lấy token

const QuanLyThongTinViTri = () => {
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
      const response = await http.get("/vi-tri");
      setUsersData(response.data.content);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpenModal = () => setVisible(true);
  const handleCloseModal = () => {
    setVisible(false);
    form.resetFields();
    setEditingUser(null); // Reset thông tin vị trí đang chỉnh sửa khi đóng popup
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(true);
  };

  const onFinish = async (values) => {
    try {
      const token = getToken(); // Lấy token từ localStorage
      if (editingUser) {
        const response = await http.put(`/vi-tri/${editingUser.id}`, values, {
          headers: {
            token: `${token}`,
          },
        });
        if (response.status === 200) {
          antdMessage.success("Cập nhật thành công!");
          form.resetFields();
          setVisible(false);
          setEditingUser(null);
          fetchData(); // Cập nhật lại dữ liệu sau khi cập nhật thành công
        } else {
          antdMessage.error("Cập nhật không thành công!");
        }
      } else {
        const response = await http.post("/vi-tri", values, {
          headers: {
            token: `${token}`,
          },
        });
        if (response.status != 200) {
          antdMessage.success("Thêm thành công!");
          form.resetFields();
          setVisible(false);
          fetchData(); // Cập nhật lại dữ liệu sau khi thêm mới thành công
        } else {
          antdMessage.error("Thêm không thành công!");
        }
      }
    } catch (error) {
      console.error("Lỗi thêm / cập nhật không thành công:", error);
      antdMessage.error("Đã có lỗi xảy ra khi thêm/cập nhật vị trí.");
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
      const token = getToken(); // Lấy token từ localStorage
      const response = await http.delete(`/vi-tri/${record.id}`, {
        headers: {
          token: `${token}`,
        },
      });
      if (response.status === 200) {
        antdMessage.success("Xoá vị trí thành công!");
        setUsersData(usersData.filter((user) => user.id !== record.id));
      } else {
        antdMessage.error("Xoá vị trí không thành công!");
      }
    } catch (error) {
      console.error("Lỗi xoá :", error);
      antdMessage.error("Đã có lỗi xảy ra khi xoá vị trí.");
    }
  };

  const uploadImageToApi = async (info, maViTri) => {
    try {
      const formData = new FormData();
      formData.append("formFile", info.file);

      const token = getToken(); // Lấy token từ localStorage
      const response = await http.post(
        `/vi-tri/upload-hinh-vitri?maViTri=${maViTri}`,
        formData,
        {
          headers: {
            token: token,
          },
        }
      );

      if (response.status === 200) {
        message.success("Tải ảnh lên thành công");

        fetchData();
      } else {
        message.error("Tải ảnh lên không thành công");
      }
    } catch (error) {
      console.error("Lỗi khi tải ảnh lên API:", error);
      message.error("Đã có lỗi xảy ra khi tải ảnh lên API");
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
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (hinhAnh, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={hinhAnh}
            alt="Hình Ảnh"
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          <Upload
            showUploadList={false}
            beforeUpload={() => false}
            onChange={(info) => uploadImageToApi(info, record.id)}
          >
            <Button icon={<UploadOutlined />} />
          </Upload>
        </div>
      ),
    },

    {
      title: "Tên Vị Trí",
      dataIndex: "tenViTri",
      key: "tenViTri",
      render: (tenViTri) => (
        <span style={{ fontWeight: "bold" }}>{tenViTri}</span>
      ),
    },
    {
      title: "Tỉnh Thành",
      dataIndex: "tinhThanh",
      key: "tinhThanh",
      render: (tinhThanh) => (
        <span style={{ fontWeight: "bold", color: "green" }}>{tinhThanh}</span>
      ),
    },
    {
      title: "Quốc Gia",
      dataIndex: "quocGia",
      key: "quocGia",
      render: (quocGia) => (
        <span style={{ fontWeight: "bold", color: "red" }}>{quocGia}</span>
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
    user.tinhThanh.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="container">
      <div>
        <Button type="primary" onClick={handleOpenModal}>
          <i class="fa-regular fa-circle-plus mr-1"></i> Thêm Thông Tin Vị Trí
        </Button>

        <Modal
          title={editingUser ? "Chỉnh sửa thông tin" : "Thêm Thông Tin Vị Trí"}
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
                <Form.Item name="hinhAnh" label="Hình Ảnh">
                  <Input prefix={<PictureOutlined />} placeholder="Tải hình" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="tenViTri"
                  label="Tên vị trí"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập vị trí.",
                    },
                  ]}
                >
                  <Input
                    prefix={<EnvironmentOutlined />}
                    placeholder="Vị trí"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="tinhThanh"
                  label="Tỉnh thành"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tỉnh thành.",
                    },
                    {
                      pattern: /^[^\d]+$/,
                      message: "Tên không được chứa chữ số.",
                    },
                  ]}
                >
                  <Input prefix={<ShopOutlined />} placeholder="Tỉnh thành" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="quocGia"
                  label="Quốc gia"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập quốc gia.",
                    },
                    {
                      pattern: /^[^\d]+$/,
                      message: "Tên không được chứa chữ số.",
                    },
                  ]}
                >
                  <Input prefix={<GlobalOutlined />} placeholder="Quốc gia" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
      <Modal
        title="Chi tiết thông tin vị trí"
        visible={detailVisible}
        onCancel={() => setDetailVisible(false)}
        footer={null}
      >
        <div>
          <p>
            <strong>ID: </strong> {detailData.id}
          </p>
          <p>
            <strong>Vị trí: </strong> {detailData.tenViTri}
          </p>
          <p>
            <strong>Tỉnh thành: </strong> {detailData.tinhThanh}
          </p>
          <p>
            <strong>Quốc gia: </strong> {detailData.quocGia}
          </p>

          <p>
            <strong>Hình ảnh: </strong>{" "}
            <img
              src={detailData.hinhAnh}
              alt="Hình Ảnh"
              style={{ width: "250px", height: "250px" }}
            />
          </p>
        </div>
      </Modal>
      <div className="search-container mt-4">
        <Input.Search
          placeholder="Nhập tỉnh thành để tìm kiếm..."
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

export default QuanLyThongTinViTri;
