import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ProfileOutlined, SafetyCertificateOutlined, UserOutlined } from "@ant-design/icons";
import logo from "./../../assets/img/logo.png";
import QuanLyNguoiDung from "./QuanLyNguoiDung/QuanLyNguoiDung";
import QuanLyThongTinViTri from "./QuanLyThongTinViTri/QuanLyThongTinViTri";
import QuanLyThongTinPhong from "./QuanLyThongTinPhong/QuanLyThongTinPhong";
import QuanLyDatPhong from "./QuanLyDatPhong/QuanLyDatPhong";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";
import "./AdminTemplate.scss"
const { Header, Sider, Content } = Layout;

const AdminTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedPage, setSelectedPage] = useState("1");

  const handleMenuClick = (key) => {
    setSelectedPage(key);
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
        return <QuanLyNguoiDung />;
    }
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="container">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <NavLink to="/" className="logo text-sm flex items-center font-bold">
            <img src={logo} style={{ paddingLeft: "10px", marginBottom: "20px" }} className="mr-3 h-6 sm:h-9" alt="Airbnb Logo" />
          </NavLink>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            onClick={({ key }) => handleMenuClick(key)}
            items={[
              { key: "1", icon: <UserOutlined />, label: "Quản Lý Người Dùng" },
              { key: "2", icon: <HomeOutlined />, label: "Quản Lý Thông Tin Vị Trí" },
              { key: "3", icon: <ProfileOutlined />, label: "Quản Lý Thông Tin Phòng" },
              { key: "4", icon: <SafetyCertificateOutlined />, label: "Quản Lý Đặt Phòng" },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: "#f0f2f5" }}>
            <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={toggleCollapsed} style={{ fontSize: "16px", width: 64, height: 64 }} />
            <span style={{ color: "#2F4F4F" }} className="font-bold">
              Trang Quản Trị
            </span>
          </Header>
          <Content style={{ margin: "24px 16px", padding: 24, minHeight: 280, background: "#f0f2f5", borderRadius: "16px" }}>
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
      <ScrollToTopButton />
    </div>
  );
};

export default AdminTemplate;
