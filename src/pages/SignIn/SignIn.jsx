import React, { useContext } from "react";
import InputSign from "../../components/Input/InputSign";
import * as registerAnimation from "./../../assets/animation/register.json";
import Lottie from "react-lottie";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { userManagementServ } from "../../services/userManagement";
import { NotifyContext } from "../../template/UserTemplate/UserTemplate";
import { useNavigate } from "react-router-dom";
import { saveLocalStorage } from "../../utils/util";
import "./SignIn.scss";
const SignIn = () => {
  const notify = useContext(NotifyContext);
  const navigate = useNavigate();
  const { handleChange, handleBlur, values, errors, touched, handleSubmit } =
    useFormik({
      initialValues: {
        taiKhoan: "",
        matKhau: "",
      },
      onSubmit: async (values) => {
        console.log(values);
        // đưa dữ liệu lên backend xử lí và hiển thị thông báo cho người dùng
        try {
          // gửi dữ liệu lên backend
          const res = await userManagementServ.signIn(values);
          // console.log(res);
          // lưu trữ dữ liệu xuống localstorage để lưu trữ
          saveLocalStorage("user", res.data.content);
          notify(
            "Đăng nhập thành công, khách hàng sẽ được chuyển hướng về trang chủ"
          );
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } catch (error) {
          console.log(error);
          notify(error.response.data.content);
        }
      },
      validationSchema: Yup.object({
        taiKhoan: Yup.string().required("Vui lòng nhập tài khoản"),
        matKhau: Yup.string().required("Vui lòng nhập mật khẩu"),
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
    <div className="signIn h-screen flex items-center justify-between">
      <div className="animation_signIn w-5/12 flex items-center justify-center">
        <Lottie options={defaultOptions} height={500} width={500} />
      </div>
      <div className="form_signIn w-7/12 flex items-center justify-center flex-col">
        <div className="p-10 border border-gray-400 rounded-md space-y-5">
          <h1 className="text-center flex items-center justify-center text-black text-2xl font-semibold leading-6 md:text-3xl">
            Đăng nhập
          </h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <InputSign
              placeholder="Vui lòng nhập tài khoản"
              id="taiKhoan"
              label="Tài khoản"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.taiKhoan}
              touched={touched.taiKhoan}
              name="taiKhoan"
              value={values.taiKhoan}
              type="email"
            />
            <InputSign
              placeholder="Vui lòng nhập mật khẩu"
              id="matKhau"
              label="Mật khẩu"
              onChange={handleChange}
              type="password"
              onBlur={handleBlur}
              error={errors.matKhau}
              touched={touched.matKhau}
              name="matKhau"
              value={values.matKhau}
            />
            <div>
              <p>
                Chưa có tài khoản? bấm
                <NavLink to="/sign-up" className="mx-1 text-blue-500">
                  vào đây
                </NavLink>
                để đăng ký
              </p>
              <button
                type="submit"
                className="py-2 px-5 bg-black text-white rounded-md w-full mt-2 hover:bg-gray-700"
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
