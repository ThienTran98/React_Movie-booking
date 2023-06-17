import React from "react";
import { NavLink } from "react-router-dom";

export default function CardItem(props) {
  const { hinhAnh, tenPhim, moTa, maPhim } = props.item;
  return (
    <div className="shadow-2xl rounded-xl">
      <div className="text-center  ">
        <img
          className="w-full h-44 object-cover rounded-t-xl rounded-tr-xl"
          src={hinhAnh}
          alt=""
        />
      </div>
      <div className="text-center">
        <h2 className="my-2 font-bold">
          {tenPhim.length >= 26 ? tenPhim.substring(0, 26) + "..." : tenPhim}
        </h2>
        <p className="min-h-[48px]">
          {moTa.length >= 40 ? moTa.substring(0, 40) + "..." : moTa}
        </p>
      </div>
      <div className="text-center mt-5 pb-2 mb-2">
        <NavLink to={`/detail/${maPhim}`}>
          <button className="bg-red-500 text-white px-3 py-2 rounded hover:text-red-500 hover:bg-white hover:border-red-600 border-solid  border">
            Xem chi tiết
          </button>
        </NavLink>
      </div>
    </div>
  );
}
