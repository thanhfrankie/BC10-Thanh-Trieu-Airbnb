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
    <div key={id} className="flex gap-3">
      <div >
        {{ name: tenNguoiBinhLuan, avatar } &&
          renderAvatar({ name: tenNguoiBinhLuan, avatar })}
      </div>
      <div className="">
        <div className="font-semibold text-lg">{tenNguoiBinhLuan}</div>
        <div >
          <Rate value={saoBinhLuan} style={{color: "#ff5a83",fontSize:"small"}} disabled />
        </div>
        <div className="text-lg font-serif">{noiDung}</div>
        <div className="text-sm">{calculateTimeAgo(ngayBinhLuan)}</div>
      </div>
    </div>
  );
};
export default RoomComment;
