import React, { useContext, useState } from "react";
import InputSign from "../../components/Input/InputSign";
import * as registerAnimation from "./../../assets/animation/register.json";
import Lottie from "react-lottie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { userManagementServ } from "../../services/userManagement";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";
import { useNavigate } from "react-router-dom";
import { saveLocalStorage, validationMessage } from "../../utils/util";

import SignInMobile from "../SignInMobile/SignInMobile";

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
        name: "",
        email: "",
        password: "",
        phone: "",
      },
      onSubmit: async (values) => {
        console.log(values);
        // đưa dữ liệu lên backend xử lí và hiển thị thông báo cho người dùng
        try {
          // gửi dữ liệu lên backend
          const res = await userManagementServ.signUp(values);
          // console.log(res);
          notify("Đăng ký thành công, vui lòng đăng nhập để tiếp tục");
          setTimeout(() => {
            navigate("/sign-in");
          }, 1000);
        } catch (error) {
          console.log(error);
          notify(error.response.data.content);
        }
      },
      validationSchema: Yup.object({
        name: Yup.string().required("Vui lòng nhập họ và tên"),
        email: Yup.string()
          .email("Vui lòng kiểm tra định dạng email")
          .required("Vui lòng nhập email"),
        password: Yup.string()
          .required("Vui lòng nhập mật khẩu")
          .min(6, "Mật khẩu yêu cầu tối thiểu 6 ký tự")
          .max(15, "Mật khẩu chỉ gồm tối đa 15 ký tự")
          .matches(
            /.*[^\w\s].*/,
            "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt"
          ),

        phone: Yup.string()
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

        <div className="form_signUp  w-1/3 h-auto  flex items-center justify-center flex-col absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 border  rounded-md space-y-5 z-10 bg-white bg-opacity-80 ">
          <h1 className="flex items-center justify-center text-black text-xl font-semibold	">
            Đăng ký thành viên
          </h1>
          <form onSubmit={handleSubmit} className="formInput space-y-6">
            <InputSign
              placeholder="Họ tên *"
              id="name"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
              touched={touched.name}
              name="name"
              value={values.name}
            />
            <InputSign
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

            <div className="relative">
              <InputSign
                placeholder="Mật khẩu *"
                id="password"
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                onBlur={handleBlur}
                error={errors.password}
                touched={touched.password}
                name="password"
                value={values.password}
              />
              <div
                className={`absolute top-1/2 right-2 transform flex items-center ${
                  errors.password && touched.password
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

            <InputSign
              placeholder="Số điện thoại *"
              id="phone"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phone}
              touched={touched.phone}
              name="phone"
              value={values.phone}
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
