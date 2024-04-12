import React, { useContext, useState } from "react";
import InputCustom from "../../components/Input/InputCustom";
import * as registerAnimation from "./../../assets/animation/register.json";
import Lottie from "react-lottie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
// import { quanLyNguoiDungServ } from "../../services/quanLyNguoiDung";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";
import { useNavigate } from "react-router-dom";
import { saveLocalStorage, validationMessage } from "../../utils/util";

import SignInMobile from "../SignInMobile/SignInMobile";
import SignIn from "../SignIn/SignIn";
// import useResponsive from "../../hooks/useResponsive";
import "./SignUp.scss";
const SignUp = () => {
  // const { isMobile, isTablet, isDesktop } = useResponsive();
  const [showPassword, setShowPassword] = useState(false);
  const notify = useContext(NotifyContext);
  const navigate = useNavigate();
  const { handleChange, handleBlur, values, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        hoTen: "",
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
      },
      onSubmit: async (values) => {
        console.log(values);
        // đưa dữ liệu lên backend xử lí và hiển thị thông báo cho người dùng
        try {
          // gửi dữ liệu lên backend
          // const res = await quanLyNguoiDungServ.dangKy(values);
          // console.log(res);
          notify("Đăng ký thành công, vui lòng đăng nhập để tiếp tục");
          setTimeout(() => {
            navigate("/sign-in");
          }, 1000);
        } catch (error) {
          console.log(error);
          // notify(error.response.data.content);
        }
      },
      validationSchema: Yup.object({
        hoTen: Yup.string().required("Vui lòng nhập họ và tên"),
        taiKhoan: Yup.string()
          .matches(/^[^\W_]+$/, "Tài khoản không thể chứa ký tự đặc biệt")
          .required("Vui lòng nhập tài khoản")
          .min(6, "Vui lòng nhập tối thiểu 6 ký tự")
          .max(16, "vui lòng nhập tối đa 16 ký tự"),
        matKhau: Yup.string()
          .required("Vui lòng nhập mật khẩu")
          .min(6, "Mật khẩu yêu cầu tối thiểu 6 ký tự")
          .max(15, "Mật khẩu chỉ gồm tối đa 15 ký tự")
          .matches(
            /.*[^\w\s].*/,
            "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt"
          ),

        email: Yup.string()
          .email("Vui lòng kiểm tra định dạng email")
          .required("Vui lòng nhập email"),
        soDt: Yup.string()
          .matches(
            /^(0[2|3|5|7|8|9])+([0-9]{8,10})$/,
            "Vui lòng nhập đúng số điện thoại"
          )
          .required("Vui lòng nhập số điện thoại"),
      }),
    });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: registerAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="w-screen h-screen bg-gray-400 relative">
      <div className="container flex justify-center items-center">
        <div className="container absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-50 pointer-events-none">
          <SignInMobile />
        </div>
      
          <div className="form_signUp  w-1/3 h-4/5  flex items-center justify-center flex-col absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 border  rounded-md space-y-5 z-10 bg-white bg-opacity-80 ">
            <h1 className="flex items-center justify-center text-black text-xl font-semibold	">
              Đăng ký thành viên
            </h1>
            <form onSubmit={handleSubmit} className="formInput space-y-6">
              <InputCustom
                placeholder="Họ tên *"
                id="hoTen"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.hoTen}
                touched={touched.hoTen}
                name="hoTen"
                value={values.hoTen}
              />
              <InputCustom
                placeholder="Tài khoản *"
                id="taiKhoan"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.taiKhoan}
                touched={touched.taiKhoan}
                name="taiKhoan"
                value={values.taiKhoan}
              />
              <div className="relative">
                <InputCustom
                  placeholder="Mật khẩu *"
                  id="matKhau"
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  onBlur={handleBlur}
                  error={errors.matKhau}
                  touched={touched.matKhau}
                  name="matKhau"
                  value={values.matKhau}
                />
                <div
                  className={`absolute top-1/2 right-2 transform flex items-center ${
                    errors.matKhau && touched.matKhau
                      ? "-translate-y-5"
                      : "-translate-y-1/3"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="mr-2"
                  >
                    {showPassword ? (
                      <i className="fas fa-eye text-gray-500"></i>
                    ) : (
                      <i className="fas fa-eye-slash text-gray-500"></i>
                    )}
                  </button>
                </div>
              </div>
              <InputCustom
                placeholder="Email *"
                id="email"
                onChange={handleChange}
                onBlur={handleBlur}
                type="email"
                error={errors.email}
                touched={touched.email}
                name="email"
                value={values.email}
              />

              <InputCustom
                placeholder="Số điện thoại *"
                id="soDt"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.soDt}
                touched={touched.soDt}
                name="soDt"
                value={values.soDt}
              />
              <div>
                <button
                  type="submit"
                  className="py-2 px-5 bg-black text-white rounded-md w-full min-w-80 hover:bg-gray-700"
                >
                  Đăng ký
                </button>
              </div>
              <p className={`text-end`}>
                Đã có tài khoản?
                <NavLink to="/sign-in" className="mx-1 text-blue-500 ">
                  Đăng nhập
                </NavLink>
                ngay
              </p>
            </form>
          </div>
      </div>
    </div>
  );
};

export default SignUp;
