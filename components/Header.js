import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setModalOpen } from "@/modules";
import { setLoginModalOpen, setRegisterModalOpen, logout } from "@/modules";

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
        <div className="navbar bg-base-100">
        <div className="navbar-start">
            <div className="dropdown">
            <label tabIndex="0" className="btn btn-ghost btn-circle" >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li><a key="0" href="">홈</a></li>
                <li><a key="1" href="/teacher">AI 업데이트</a></li>
                <li><a key="2" href="/videoLog">대화주제</a></li>
            </ul>
            </div>
        </div>
        <div className="navbar-center">
            <a className="btn btn-ghost normal-case text-xl" href="/">DeepTalk</a>
        </div>
        <div className="navbar-end">

        <div className="dropdown dropdown-end">
      <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src="https://api.lorem.space/image/face?hash=33791" />
        </div>
      </label>
      <ul className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">

      {userUrls.actions.map((action, i) => (
          <li key={i}><button onClick={() => {
            dispatch(action(true));
          }}>{userUrls.subTitles[i]}</button></li>
      
    ))}
      </ul>
    </div>
        </div>
        </div>

    </header>
  );
}
