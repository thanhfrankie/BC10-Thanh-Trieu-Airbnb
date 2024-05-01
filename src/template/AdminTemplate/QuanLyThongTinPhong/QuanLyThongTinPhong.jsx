import React, { useState, useEffect } from "react";
import { message as antdMessage, Switch, Upload } from "antd";
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
import "../QuanLyNguoiDung/QuanLyNguoiDung.scss";
import { http } from "../../../services/config";
import {
  PictureOutlined,
  PushpinOutlined,
  ShopOutlined,
  GlobalOutlined,
  FormOutlined,
  PoundOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { TextArea, Search } = Input;

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
    setEditingUser(null); // Reset thông tin vị trí đang chỉnh sửa khi đóng popup
  };

  const handleCancel = () => {
    form.resetFields();
    setVisible(true);
  };

  const onFinish = async (values) => {
    try {
      if (editingUser) {
        // Nếu có người dùng đang được chỉnh sửa
        const response = await http.put(
          `/phong-thue/${editingUser.id}`,
          values
        ); // Gửi yêu cầu cập nhật thông tin người dùng
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
        const response = await http.post("/phong-thue", values);
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
      console.log(error);
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
      const response = await http.delete(`/phong-thue?id=${record.id}`);
      if (response.status === 200) {
        antdMessage.success("Xoá vị trí thành công!");
        // Cập nhật danh sách người dùng sau khi xoá thành công
        setUsersData(usersData.filter((user) => user.id !== record.id));
      } else {
        antdMessage.error("Không xoá được vị trí.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      antdMessage.error("Đã có lỗi xảy ra khi xoá vị trí.");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (hinhAnh) => (
        <img
          src={hinhAnh}
          alt="Hình Ảnh"
          style={{ width: "300px", height: "50px" }}
        />
      ),
    },
    { title: "Tên Phòng", dataIndex: "tenPhong", key: "tenPhong" },
    { title: "Mô Tả", dataIndex: "moTa", key: "moTa" },
    { title: "Giá Tiền ($)", dataIndex: "giaTien", key: "giaTien" },
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
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item name="id" label="ID Phòng">
                  <Input disabled placeholder="ID" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="hinhAnh"
                  label="Hình Ảnh"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng thêm hình ảnh.",
                    },
                  ]}
                >
                  <Upload
                    name="hinhAnh"
                    action="/phong-thue/upload-hinh-phong" // API endpoint để tải hình ảnh lên
                    listType="picture"
                    maxCount={1} // Số lượng tệp tối đa được chấp nhận
                  >
                    <Button icon={<UploadOutlined />}>Tải lên</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={12}>
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
              <Col span={12}>
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
              <Col span={12}>
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
              <Col span={12}>
                <Form.Item name="mayGiat" label="Máy Giặt">
                  <Switch
                    defaultChecked={editingUser ? editingUser.mayGiat : false}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
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
              style={{ width: "200px", height: "200px" }}
            />
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

export default QuanLyThongTinPhong;
