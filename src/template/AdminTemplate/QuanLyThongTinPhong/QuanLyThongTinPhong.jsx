import React, { useState, useEffect } from "react";
import { message as antdMessage, Switch, Upload } from "antd";
import { Modal, Button,  Form,Input, message, Row, Col, Table,} from "antd";
import "../QuanLyNguoiDung/QuanLyNguoiDung.scss";
import { http } from "../../../services/config";
import { ShopOutlined,  FormOutlined,PoundOutlined,InsertRowLeftOutlined,InboxOutlined,InsertRowRightOutlined,UploadOutlined,PictureOutlined,} from "@ant-design/icons";
import { getToken } from "../../../services/authService"; 

const QuanLyThongTinPhong = () => {
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
      const response = await http.get("/phong-thue");
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
      const token = getToken(); 
      if (editingUser) {
        const response = await http.put(
          `/phong-thue/${editingUser.id}`,
          values,
          {
            headers: {
              token: `${token}`,
            },
          }
        );
        if (response.status === 200) {
          antdMessage.success("Cập nhật thành công!");
          form.resetFields();
          setVisible(false);
          setEditingUser(null);
          fetchData(); 
        } else {
          antdMessage.error("Cập nhật không thành công!");
        }
      } else {
        const response = await http.post("/phong-thue", values, {
          headers: {
            token: `${token}`,
          },
        });
        if (response.status != 200) {
          antdMessage.success("Thêm thành công!");
          form.resetFields();
          setVisible(false);
          fetchData(); 
        } else {
          antdMessage.error("Thêm không thành công!");
        }
      }
    } catch (error) {
      console.error("Lỗi thêm / cập nhật không thành công:", error);
      antdMessage.error("Đã có lỗi xảy ra khi thêm/cập nhật phòng thuê.");
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
      const token = getToken(); 
      const response = await http.delete(`/phong-thue/${record.id}`, {
        headers: {
          token: `${token}`,
        },
      });
      if (response.status === 200) {
        antdMessage.success("Xoá phòng thuê thành công!");
        setUsersData(usersData.filter((user) => user.id !== record.id));
      } else {
        antdMessage.error("Không xoá được phòng thuê.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      antdMessage.error("Đã có lỗi xảy ra khi xoá phòng thuê.");
    }
  };

  const uploadImageToApi = async (info, maPhong) => {
    try {
      const formData = new FormData();
      formData.append("formFile", info.file);

      const token = getToken(); 
      const response = await http.post(
        `/phong-thue/upload-hinh-phong?maPhong=${maPhong}`,
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
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "40px" }}
        >
          <img
            src={hinhAnh}
            alt="Hình Ảnh"
            style={{ width: "100px", height: "50px", marginRight: "10px" }}
          />
          <Upload
            showUploadList={false}
            beforeUpload={() => false}
            onChange={(info) => uploadImageToApi(info, record.id)}
          >
            <Button icon={<UploadOutlined />} style={{}} />
          </Upload>
        </div>
      ),
    },
    {
      title: "Tên Phòng",
      dataIndex: "tenPhong",
      key: "tenPhong",
      render: (tenPhong) => (
        <span style={{ fontWeight: "bold" }}>{tenPhong}</span>
      ),
    },
    {
      title: "Mô Tả",
      dataIndex: "moTa",
      key: "moTa",
      render: (moTa) => (
        <span style={{ color: "#2F4F4F" }}>
          {moTa.length > 100 ? `${moTa.substring(0, 100)}...` : moTa}
        </span>
      ),
    },

    {
      title: "Giá Tiền ($)",
      dataIndex: "giaTien",
      key: "giaTien",
      render: (giaTien) => (
        <span style={{ fontWeight: "bold", color: "green" }}>{giaTien}</span>
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
    user.tenPhong.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="container">
      <div>
        <Button type="primary" onClick={handleOpenModal}>
          <i class="fa-regular fa-circle-plus mr-1"></i> Thêm Thông Tin Phòng
        </Button>

        <Modal
          className="widthModalPhong"
          title={editingUser ? "Chỉnh sửa thông tin" : "Thêm Thông Tin Phòng"}
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
            <Row gutter={[8, 0]}>
              <Col span={8}>
                <Form.Item name="id" label="ID Phòng">
                  <Input disabled placeholder="ID" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="hinhAnh" label="Hình Ảnh">
                  <Input prefix={<PictureOutlined />} placeholder="Hình ảnh" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="tenPhong"
                  label="Tên Phòng"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên phòng.",
                    },
                  ]}
                >
                  <Input prefix={<ShopOutlined />} placeholder="Tên phòng" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="moTa"
                  label="Mô Tả"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mô tả.",
                    },
                  ]}
                >
                  <Input prefix={<FormOutlined />} placeholder="Mô Tả" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="giaTien"
                  label="Giá tiền $"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập giá tiền.",
                    },
                    {
                      pattern: /^[0-9]+$/,
                      message: "Nhập vào chữ số.",
                    },
                  ]}
                >
                  <Input prefix={<PoundOutlined />} placeholder="Giá tiền $" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="khach"
                  label="Phòng khách"
                  rules={[
                    {
                      required: true,
                      message: "Nhập só lượng phòng",
                    },
                    {
                      pattern: /^[0-9]+$/,
                      message: "Nhập vào chữ số.",
                    },
                  ]}
                >
                  <Input
                    prefix={<InsertRowRightOutlined />}
                    placeholder="Số lượng phòng"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="phongNgu"
                  label="Phòng ngủ"
                  rules={[
                    {
                      required: true,
                      message: "Nhập só lượng phòng",
                    },
                    {
                      pattern: /^[0-9]+$/,
                      message: "Nhập vào chữ số.",
                    },
                  ]}
                >
                  <Input
                    prefix={<InsertRowRightOutlined />}
                    placeholder="Số lượng phòng"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="giuong"
                  label="Giường"
                  rules={[
                    {
                      required: true,
                      message: "Nhập só lượng giường",
                    },
                    {
                      pattern: /^[0-9]+$/,
                      message: "Nhập vào chữ số.",
                    },
                  ]}
                >
                  <Input
                    prefix={<InboxOutlined />}
                    placeholder="Số lượng giường"
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="phongTam"
                  label="Phòng tắm"
                  rules={[
                    {
                      required: true,
                      message: "Nhập só lượng phòng",
                    },
                    {
                      pattern: /^[0-9]+$/,
                      message: "Nhập vào chữ số.",
                    },
                  ]}
                >
                  <Input
                    prefix={<InsertRowLeftOutlined />}
                    placeholder="Số lượng phòng"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item name="mayGiat" label="Máy Giặt">
                  <Switch
                    defaultChecked={editingUser ? editingUser.mayGiat : false}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 0]}>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item name="banLa" label="Bàn Là">
                  <Switch
                    defaultChecked={editingUser ? editingUser.banLa : false}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item name="tivi" label="TV">
                  <Switch
                    defaultChecked={editingUser ? editingUser.tivi : false}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item name="dieuHoa" label="Điều hoà">
                  <Switch
                    defaultChecked={editingUser ? editingUser.dieuHoa : false}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item name="wifi" label="Wifi">
                  <Switch
                    defaultChecked={editingUser ? editingUser.wifi : false}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item name="bep" label="Bếp">
                  <Switch
                    defaultChecked={editingUser ? editingUser.bep : false}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item name="doXe" label="Đỗ xe">
                  <Switch
                    defaultChecked={editingUser ? editingUser.doXe : false}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item name="hoBoi" label="Hồ bơi">
                  <Switch
                    defaultChecked={editingUser ? editingUser.hoBoi : false}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Form.Item name="banUi" label="Bàn ủi">
                  <Switch
                    defaultChecked={editingUser ? editingUser.banUi : false}
                  />
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
            <strong>Tên phòng: </strong> {detailData.tenPhong}
          </p>
          <p>
            <strong>Giá: </strong> {detailData.giaTien} $
          </p>
          <p>
            <strong>Mô tả: </strong> {detailData.moTa}
          </p>
          <div className="grid grid-cols-4">
            <div className=" col-span-2">
              <p>
                <strong>Phòng khách: </strong> {detailData.khach}
              </p>
              <p>
                <strong>Phòng ngủ: </strong> {detailData.phongNgu}
              </p>
              <p>
                <strong>Giường: </strong> {detailData.giuong}
              </p>
              <p>
                <strong>Phòng tắm: </strong> {detailData.phongTam}
              </p>
              <p>
                <strong>Máy giặt: </strong>{" "}
                {detailData.mayGiat ? "Có" : "Không"}
              </p>
              <p>
                <strong>Bàn là: </strong> {detailData.banLa ? "Có" : "Không"}
              </p>
              <p>
                <strong>TV: </strong> {detailData.tivi ? "Có" : "Không"}
              </p>
            </div>
            <div className=" col-span-2">
              <p>
                <strong>Điều hòa: </strong>{" "}
                {detailData.dieuHoa ? "Có" : "Không"}
              </p>
              <p>
                <strong>Wifi: </strong> {detailData.wifi ? "Có" : "Không"}
              </p>
              <p>
                <strong>Bếp: </strong> {detailData.bep ? "Có" : "Không"}
              </p>
              <p>
                <strong>Đỗ xe: </strong> {detailData.doXe ? "Có" : "Không"}
              </p>
              <p>
                <strong>Hồ bơi: </strong> {detailData.hoBoi ? "Có" : "Không"}
              </p>
              <p>
                <strong>Bàn ủi: </strong> {detailData.banUi ? "Có" : "Không"}
              </p>
            </div>
          </div>

          <p>
            <strong>Hình ảnh: </strong>{" "}
            <img
              src={detailData.hinhAnh}
              alt="Hình Ảnh"
              style={{ width: "400px", height: "200px" }}
            />
          </p>
        </div>
      </Modal>
      <div className="search-container mt-4">
        <Input.Search
          placeholder="Nhập tên phòng để tìm kiếm..."
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

export default QuanLyThongTinPhong;
