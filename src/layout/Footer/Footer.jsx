import React from "react";
import "./Footer.scss";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer h-full w-full mx-auto flex items-center justify-center flex-col ">
      <div className="main-footer__container w-full border border-t-2 py-3">
        <div className="main-footer">
          <div className="support  h-full w-1/3 flex items-center justify-center">
            <ul className="flex h-full flex-col text-start gap-3">
              <li className="first-li">Hỗ trợ</li>
              <NavLink to="https://www.airbnb.com.vn/help">
                <li>Trung tâm trợ giúp</li>
              </NavLink>
              <NavLink to="https://www.airbnb.com.vn/aircover">
                <li>AirCover</li>
              </NavLink>
              <NavLink to="https://www.airbnb.com.vn/against-discrimination">
                <li>Chống phân biệt đối xử</li>
              </NavLink>
              <NavLink to="https://www.airbnb.com.vn/accessibility">
                <li>Hỗ trợ người khuyết tật</li>
              </NavLink>
              <NavLink to="https://www.airbnb.com.vn/help/article/2701">
                <li>Các tùy chọn hủy</li>
              </NavLink>
              <NavLink to="https://www.airbnb.com.vn/neighbor">
                <li>Báo cáo lo ngại của khu dân cư</li>
              </NavLink>
            </ul>
          </div>
          <div className="hosting h-auto w-1/3 flex items-center justify-center ">
            <ul className="w-full flex  flex-col text-start gap-3">
              <li className="first-li">Đón tiếp khách</li>
              <NavLink to="https://www.airbnb.com.vn/host">
                <li>Cho thuê nhà trên Airbnb</li>
              </NavLink>
              <NavLink to="https://www.airbnb.com.vn/aircover-for-hosts">
                <li>AirCover cho Chủ nhà</li>
              </NavLink>
              <NavLink to="https://www.airbnb.com.vn/resources">
                <li>Tài nguyên về đón tiếp khách</li>
              </NavLink>
              <NavLink to="https://www.airbnb.com.vn/help/community">
                <li>Diễn đàn cộng đồng</li>
              </NavLink>
              <NavLink to="https://www.airbnb.com.vn/help/responsible-hosting">
                <li>Đón tiếp khách có trách nhiệm</li>
              </NavLink>
              <NavLink to="https://www.airbnb.com.vn/ambassadors/joinaclass">
                <li>Tham gia khóa học miễn phí về công việc Đón tiếp khách</li>
              </NavLink>
            </ul>
          </div>
          <div className="airbnb h-auto w-1/3 flex items-center justify-center ">
            <ul className="flex flex-col text-start gap-3">
              <li className="first-li ">Airbnb</li>
              <NavLink to="https://www.airbnb.com.vn/press/news">
                <li>Trang tin tức</li>
              </NavLink>
              <NavLink to="https://www.airbnb.com.vn/release">
                <li>Tính năng mới</li>
              </NavLink>
              <NavLink to="https://www.airbnb.com.vn/carreers">
                <li>Cơ hội nghề nghiệp</li>
              </NavLink>
              <NavLink to="https://www.airbnb.com.vn/investors">
                <li>Nhà đầu tư</li>
              </NavLink>
              <NavLink to="https://vi.airbnb.org">
                <li>Chỗ ở khẩn cấp Airbnb.org</li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright-footer"
      >
        <div className="copyright-footer__container"
          >
          <div className="copyright "
          >
            <div className="flex items-center justify-center gap-1">
              <div className="text-sm">
                <i class="fa-light fa-copyright"></i>
              </div>
              <span>2024 Airbnb, Inc.</span>
            </div>
            <NavLink to="https://www.airbnb.com.vn/terms/privacy_policy">
              <button className="copyright-link">Quyền riêng tư</button>
            </NavLink>
            <span>·</span>
            <NavLink to="https://www.airbnb.com.vn/terms">
              <button className="copyright-link">Điều khoản</button>
            </NavLink>
            <span>·</span>
            <NavLink to="https://www.airbnb.com.vn/sitemaps/v2">
              <button className="copyright-link">Sơ đồ trang web</button>
            </NavLink>
          </div>

          <div className="copyright-footer__right"
          //  flex w-1/2 items-center justify-end gap-4 font-medium"
          >
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
