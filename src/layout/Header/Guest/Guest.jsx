import React, { useState, useEffect } from "react";
import { Popover, Button } from "antd";
import ButtonCustom from "../../../components/Button/ButtonCustom";

const Guest = () => {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);
  const [visible, setVisible] = useState(false);
  const [totalGuests, setTotalGuests] = useState(0);
  useEffect(() => {
    setTotalGuests(adults + children + infants + pets);
  }, [adults, children, infants, pets]);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };
  const increment = (setter, value) => () => setter(value + 1);
  const decrement = (setter, value) => () => setter(value > 0 ? value - 1 : 0);
  const content = (
    <div className="py-2 px-4">
      {[
        { label: "Người lớn", value: adults, setter: setAdults },
        { label: "Trẻ em", value: children, setter: setChildren },
        { label: "Em bé", value: infants, setter: setInfants },
        { label: "Thú cưng", value: pets, setter: setPets },
      ].map(({ label, value, setter }) => (
        <div key={label} className="flex items-center justify-between my-2">
          <span className="px-2">{label}</span>
          <div className="flex items-center space-x-2">
            <Button onClick={decrement(setter, value)} disabled={value === 0}>
              -
            </Button>
            <span>{value}</span>
            <Button onClick={increment(setter, value)}>+</Button>
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <Popover
      content={content}
      trigger="click"
      open={visible}
      onOpenChange={handleVisibleChange}
      placement="bottomLeft"
    >
      <div>
        <ButtonCustom
          value="Khách"
          span={totalGuests > 0 ? `${totalGuests} khách` : "Thêm khách"}
          classNameBtn="btnSearch text-xs w-full px-6 text-start font-bold"
        />
      </div>
    </Popover>
  );
};

export default Guest;
