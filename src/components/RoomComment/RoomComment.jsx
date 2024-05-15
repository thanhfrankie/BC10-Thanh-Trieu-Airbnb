import { Rate } from "antd";
import { calculateTimeAgo, renderAvatar } from "../../utils/util";

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
      {renderAvatar({ name: tenNguoiBinhLuan, avatar }, 10, 10)}
      <div>{noiDung}</div>
      <div>
        <Rate value={saoBinhLuan} disabled />
      </div>
      <div>{calculateTimeAgo(ngayBinhLuan)}</div>
    </div>
  );
};
export default RoomComment;
