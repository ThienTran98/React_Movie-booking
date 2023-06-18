import React from "react";
import { message } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { userService } from "../../services/userService";
import styles from "./register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function RegisterPage() {
  const navigate = useNavigate();

  const regexNumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$/;
  const regexName = new RegExp("[A-zÀ-ÿ]");
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9_])/;
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "",
      hoTen: "",
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("Vui lòng nhập trường này ! "),
      matKhau: Yup.string()
        .min(8, "Vui lòng nhập ít nhất 8 kí tự")
        .matches(
          regexPassword,
          "Mật khẩu phải chứa ít nhất một chữ số và cả chữ hoa , chữ thường và một kí tự đặc biệt"
        )
        .required("Vui lòng nhập trường này ! "),
      email: Yup.string()
        .matches(regexEmail, "Email không hợp lệ, vui lòng nhập lại !")
        .required("Vui lòng nhập trường này ! "),
      hoTen: Yup.string()
        .matches(regexName, "Trường nãy phải là chữ !")
        .required("Vui lòng nhập trường này ! "),
      soDt: Yup.string()
        .matches(regexNumber, "Trường này phải là số !")
        .required("Vui lòng nhập trường này ! "),
      maNhom: Yup.string().required("Vui lòng chọn trường này ! "),
    }),

    onSubmit: (values) => {
      userService
        .postRegister(values)
        .then((res) => {
          message.success("Đăng ký thành công");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        })
        .catch((err) => {
          message.error(err.response.data.content);
        });
    },
  });
  return (
    <div className="mt-24 w-screen h-screen">
      <div className={`${styles.modalRegister} flex`}>
        <div className="container my-auto px-10">
          <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
              <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
                Đăng Ký
              </h1>
              <form className="mt-2" onSubmit={formik.handleSubmit}>
                <div className="mb-1">
                  <label
                    for="hoTen"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Họ và Tên
                  </label>
                  <input
                    id="hoTen"
                    name="hoTen"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={formik.handleChange}
                    value={formik.values.hoTen}
                  />
                  {formik.errors.hoTen && (
                    <h2 className="text-red-700 text-sm font-semibold">
                      {formik.errors.hoTen}
                    </h2>
                  )}
                </div>
                <div className="mb-1">
                  <label
                    for="taiKhoan"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Tài Khoản
                  </label>
                  <input
                    id="taiKhoan"
                    name="taiKhoan"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.taiKhoan}
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {formik.errors.taiKhoan && (
                    <h2 className="text-red-700 text-sm font-semibold">
                      {formik.errors.taiKhoan}
                    </h2>
                  )}
                </div>
                <div className="mb-1">
                  <label
                    for="matKhau"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Mật Khẩu
                  </label>
                  <input
                    id="matKhau"
                    name="matKhau"
                    type="password"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={formik.handleChange}
                    value={formik.values.matKhau}
                  />
                  {formik.errors.matKhau && (
                    <h2 className="text-red-700 text-sm font-semibold">
                      {formik.errors.matKhau}
                    </h2>
                  )}
                </div>
                <div className="mb-1">
                  <label
                    for="email"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.errors.email && (
                    <h2 className="text-red-700 text-sm font-semibold">
                      {formik.errors.email}
                    </h2>
                  )}
                </div>
                <div className="mb-1">
                  <label
                    for="soDt"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Số Điện Thoại
                  </label>
                  <input
                    id="soDt"
                    name="soDt"
                    type="tel"
                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={formik.handleChange}
                    value={formik.values.soDt}
                  />
                  {formik.errors.soDt && (
                    <h2 className="text-red-700 text-sm font-semibold">
                      {formik.errors.soDt}
                    </h2>
                  )}
                </div>
                <div className="mb-1 cursor-pointer">
                  <label
                    htmlFor="maNhom"
                    className="block mb-1 font-semibold text-gray-800 "
                  >
                    ID Nhóm
                  </label>
                  <select
                    id="maNhom"
                    name="maNhom"
                    onChange={formik.handleChange}
                    value={formik.values.maNhom}
                    className="bg-gray-50 border px-4  outline-0 text-gray-900 text-sm rounded-lg focus:border-2 hover:border-green-500 block w-full  p-2 hover:cursor-pointer "
                  >
                    <option defaultValue>Choose a Group</option>
                    <option value="GP01">GP01</option>
                    <option value="GP02">GP02</option>
                    <option value="GP03">GP03</option>
                    <option value="GP04">GP04</option>
                    <option value="GP05">GP05</option>
                    <option value="GP06">GP06</option>
                    <option value="GP07">GP07</option>
                    <option value="GP07">GP08</option>
                    <option value="GP07">GP09</option>
                    <option value="GP07">GP10</option>
                  </select>
                  {formik.errors.maNhom && (
                    <h2 className="text-red-700 text-sm font-semibold">
                      {formik.errors.maNhom}
                    </h2>
                  )}
                </div>
                <div className="mt-4">
                  <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                    Đăng Ký
                  </button>
                </div>
              </form>
              <p className="mt-5 text-xs font-light text-center text-gray-700">
                Bạn đã có tài khoản
                <NavLink
                  to="/login"
                  className="font-medium text-purple-600 hover:underline ml-2"
                >
                  Đăng Nhập
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
