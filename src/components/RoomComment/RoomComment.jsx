import { Rate } from "antd";
import { calculateTimeAgo } from "../../utils/util";

export const RoomComment = ({
  id,
  tenNguoiBinhLuan,
  avatar,
  noiDung,
  saoBinhLuan,
  ngayBinhLuan,
}) => {
  return (
    <div key={id}>
      <div>{tenNguoiBinhLuan}</div>
      <img className="w-8 h-8" src={avatar} alt="" />
      <div>{noiDung}</div>
      <div>
        <Rate value={saoBinhLuan} disabled />
      </div>
      <div>{calculateTimeAgo(ngayBinhLuan)}</div>
    </div>
  );
};
export default RoomComment;
