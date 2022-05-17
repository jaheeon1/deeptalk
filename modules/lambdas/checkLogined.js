const checkLogined = function() {
	const loginedStudent = JSON.parse(localStorage.getItem("loginedStudent"));
	if (!loginedStudent || !loginedStudent.token) {
		throw Error;
	}
	
}
export default checkLogined