import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { PersonAddSVG } from "@/icons";
import { setModalOpen } from "@/modules";
import { setLoginModalOpen, setRegisterModalOpen, logout } from "@/modules";

const basicSettings = {
  subTitles: ["멤버관리"],
  actions: ["/talk/list"],
};

export function Nav() {
  const dispatch = useDispatch();
  const [loginCheck, setLoginCheck] = useState(false);
  const [studentUrls, setStudentUrls] = useState({ subTitles: [], actions: [] });

  const handleCloseStudentMenu = () => {
    setAnchorElStudent(null);
  };
  const handleLogout = () => {
    dispatch(logoutRequest());
  };
  const navs = {
    subTitles: ["talk", "students", "teacher"],
    urls: ["/", "students", "teacher"],
  }
  useEffect(() => {
		const loginedStudent = JSON.parse(localStorage.getItem("loginedStudent"));
    if (loginedStudent === null) {

    } else {

    }
  }, []);

  return (
    <nav>
    {navs.urls.map((url, i) => (
      <a
        className="btn btn__primary btn__icon"
        key={i}
        href={url}
        
      >
        <span>{navs.subTitles[i]}</span>
      </a>
    ))}
    </nav>
  );
}
