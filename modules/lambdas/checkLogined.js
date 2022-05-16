

const checkLogined = function() {
	const loginedStudent = JSON.parse(localStorage.getItem("loginedStudent"));
	console.log('loginedStudent.token', loginedStudent.token);
	if (!loginedStudent.token) {
		throw Error;
	}
	
}
export default checkLogined