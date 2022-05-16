import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { PersonAddSVG } from "@/icons";
import { setModalOpen } from "@/modules";
import { setLoginModalOpen, setRegisterModalOpen, logout } from "@/modules";

const basicSettings = {
  subTitles: ["대화내역"],
  actions: ["/talk/list"],
};

export function Header() {
  const dispatch = useDispatch();
  const [loginCheck, setLoginCheck] = useState(false);
  const [userUrls, setStudentUrls] = useState({ subTitles: [], actions: [] });

  const handleCloseStudentMenu = () => {
    setAnchorElStudent(null);
  };
  const handleLogout = () => {
    dispatch(logoutRequest());
  };
  const navs = {
    subTitles: ["홈", "대화내역", "선생님"],
    urls: ["/", "talk", "teacher"],
  }
  useEffect(() => {
		const loginedStudent = JSON.parse(localStorage.getItem("loginedStudent"));
    if (loginedStudent === null) {
      setStudentUrls({
        subTitles: ["회원가입", "로그인"],
        actions: [setRegisterModalOpen, setLoginModalOpen],
      });
    } else {
      setLoginCheck(true);
      setStudentUrls({
        subTitles: ["로그아웃", "정보수정"],
        actions: [logout, setRegisterModalOpen],
      });
    }
  }, []);

  return (
    <header className="header">
    {navs.urls.map((url, i) => (
      <a
        className="btn btn__primary btn__icon"
        key={i}
        href={url}
        
      >
        <span>{navs.subTitles[i]}</span>
      </a>
    ))}
    {userUrls.actions.map((action, i) => (
      <button
        className="btn btn__primary btn__icon"
        key={i}
        onClick={() => {
          dispatch(action(true));
        }}
      >
        <span>{userUrls.subTitles[i]}</span>
      </button>
    ))}
    </header>
  );
}
