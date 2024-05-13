import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./AdminTemplate.scss";
import logo from "./../../assets/img/logo.png";
import {HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ProfileOutlined, SafetyCertificateOutlined, UserOutlined,} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import QuanLyNguoiDung from "./QuanLyNguoiDung/QuanLyNguoiDung";
import QuanLyThongTinViTri from "./QuanLyThongTinViTri/QuanLyThongTinViTri";
import QuanLyThongTinPhong from "./QuanLyThongTinPhong/QuanLyThongTinPhong";
import QuanLyDatPhong from "./QuanLyDatPhong/QuanLyDatPhong";
const { Header, Sider, Content } = Layout;
const AdminTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedPage, setSelectedPage] = useState(""); // State để lưu trữ trang được chọn
  const navigate = useNavigate();
  const handleMenuClick = (key) => {
    setSelectedPage(key); // Cập nhật trang được chọn khi click vào MenuItem
  };
  const renderContent = () => {
    switch (selectedPage) {
      case "1":
        return <QuanLyNguoiDung />;
      case "2":
        return <QuanLyThongTinViTri />;
      case "3":
        return <QuanLyThongTinPhong />;
      case "4":
        return <QuanLyDatPhong />;
      default:
        return <QuanLyNguoiDung />; // Mặc định không hiển thị nội dung nào
    }
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div className="container ">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <NavLink to="/" className="logo text-sm flex items-center  font-bold">
            <img
              src={logo}
              style={{ paddingLeft: "10px", marginBottom: "20px" }}
              className="mr-3 h-6 sm:h-9"
              alt="Airbnb Logo"
            />
          </NavLink>
          <div className="demo-logo-vertical " />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={({ key }) => handleMenuClick(key)}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: "Quản Lý Người Dùng",
              },
              {
                key: "2",
                icon: <HomeOutlined />,
                label: "Quản Lý Thông Tin Vị Trí",
              },
              {
                key: "3",
                icon: <ProfileOutlined />,
                label: "Quản Lý Thông Tin Phòng",
              },
              {
                key: "4",
                icon: <SafetyCertificateOutlined />,
                label: "Quản Lý Đặt Phòng",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0,  background: colorBgContainer,  }} >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />{" "}
            <span style={{ color: "#2F4F4F" }} className=" font-bold ">
              Trang Quản Trị
            </span>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}{" "}
            {/* Hiển thị nội dung tùy thuộc vào trang được chọn */}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default AdminTemplate;
