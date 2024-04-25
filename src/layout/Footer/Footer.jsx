import React from "react";
import "./Footer.scss";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer h-full w-full space-x-3  mx-auto flex items-center justify-center flex-col ">
      <div className="subFooter">a</div>
      <div className="mainFooter w-full border border-t-2 py-3">
        <div className="mx-auto w-3/4  flex items-start justify-between gap-13 ">
          <div className="support  h-full w-1/3 flex items-center justify-center">
            <ul className="flex h-full items-start justify-center flex-col text-start gap-3">
              <li className="firstLi">Hỗ trợ</li>
              <NavLink to="/help">
                <li>Trung tâm trợ giúp</li>
              </NavLink>
              <NavLink to="/aircover">
                <li>AirCover</li>
              </NavLink>
              <NavLink to="/against-discrimination">
                <li>Chống phân biệt đối xử</li>
              </NavLink>
              <NavLink to="/accessibility">
                <li>Hỗ trợ người khuyết tật</li>
              </NavLink>
              <NavLink to="/help/article/2701">
                <li>Các tùy chọn hủy</li>
              </NavLink>
              <NavLink to="/neighbor">
                <li>Báo cáo lo ngại của khu dân cư</li>
              </NavLink>
            </ul>
          </div>
          <div className="hosting h-auto w-1/3 flex items-center justify-center ">
            <ul className="px-2 flex items-start justify-center flex-col text-start gap-3">
              <li className="firstLi">Đón tiếp khách</li>
              <NavLink to="/host">
                <li>Cho thuê nhà trên Airbnb</li>
              </NavLink>
              <NavLink to="/aircover-for-hosts">
                <li>AirCover cho Chủ nhà</li>
              </NavLink>
              <NavLink to="/resources">
                <li>Tài nguyên về đón tiếp khách</li>
              </NavLink>
              <NavLink to="/help/community">
                <li>Diễn đàn cộng đồng</li>
              </NavLink>
              <NavLink to="/help/responsible-hosting">
                <li>Đón tiếp khách có trách nhiệm</li>
              </NavLink>
              <NavLink to="/ambassadors/joinaclass">
                <li>Tham gia khóa học miễn phí về công việc Đón tiếp khách</li>
              </NavLink>
            </ul>
          </div>
          <div className="airbnb h-auto  w-1/3 flex items-center justify-center ">
            <ul className="flex items-start justify-center flex-col text-start gap-3">
              <li className="firstLi ">Airbnb</li>
              <NavLink to="/press/news">
                <li>Trang tin tức</li>
              </NavLink>
              <NavLink to="/release">
                <li>Tính năng mới</li>
              </NavLink>
              <NavLink to="/carreers">
                <li>Cơ hội nghề nghiệp</li>
              </NavLink>
              <NavLink to="/investors">
                <li>Nhà đầu tư</li>
              </NavLink>
              <NavLink to="https://vi.airbnb.org">
                <li>Chỗ ở khẩn cấp Airbnb.org</li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
      <div className="copyrightFooter mx-auto w-full mt-3 flex items-center justify-center">
        <div className="mx-auto w-3/4 px-11 py-2 flex items-center justify-between">
          <div className="copyright flex w-1/2 items-center justify-center gap-2">
            <div className="flex items-center justify-center gap-1">
              <div className="text-sm">
                <i class="fa-light fa-copyright"></i>
              </div>
              <span>2024 Airbnb, Inc.</span>
            </div>
            <span>·</span>
            <NavLink>
              <button className="copyrightLink">Quyền riêng tư</button>
            </NavLink>
            <span>·</span>
            <NavLink>
              <button className="copyrightLink">Điều khoản</button>
            </NavLink>
            <span>·</span>
            <NavLink>
              <button className="copyrightLink">Sơ đồ trang web</button>
            </NavLink>
          </div>

          <div className="flex w-1/2 items-center justify-end gap-4 font-medium">
            <div className="flex items-center justify-center gap-2">
              <button>
                <i class="fa-regular fa-globe"></i>
              </button>
              <button>Tiếng Việt (VN)</button>
            </div>
            <div className="flex items-center justify-center gap-2">
              <button>
                <i class="fa-sharp fa-solid fa-dollar-sign"></i>USD
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 text-xl">
              <NavLink to="https://facebook.com/airbnb" target="_blank">
                <i class="fa-brands fa-square-facebook"></i>
              </NavLink>
              <NavLink to="https://twitter.com/airbnb" target="_blank">
                <i class="fa-brands fa-square-twitter"></i>
              </NavLink>
              <NavLink to="https://instagram.com/airbnb" target="_blank">
                <i class="fa-brands fa-square-instagram"></i>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
