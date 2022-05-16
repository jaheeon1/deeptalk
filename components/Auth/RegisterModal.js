import { useEffect } from "react";
import ReactDOM from "react-dom";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import cx from "clsx";

import { CheckSVG, CloseSVG } from "@/icons";
import {
	addStudent,
	setRegisterModalOpen,
	setSelectedStudent,
	updateStudent,
} from "@/modules";

export function RegisterModal() {
	const { register, handleSubmit, errors, reset, setValue } = useForm();
console.log('RegisterModal')
	const state = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const closeModal = () => {
		reset();
		dispatch(setRegisterModalOpen(false));
		dispatch(setSelectedStudent(undefined));
	};

	const onSubmitHandler = (data) => {
		if (data) {
			closeModal();
		}
        console.log(state.selectedStudent);

		if (state.selectedStudent !== undefined) {
            console.log('ffff')
        dispatch(
				updateStudent({
					_id: state.selectedStudent._id,
					...data,
				})
			);
		} else {
        console.log('ssddd');
			dispatch(addStudent(data));
		}
	};

	useEffect(() => {
		if (state.selectedStudent) {
			setValue("_id", state.selectedStudent._id);
			setValue("userid", state.selectedStudent.userid);
			setValue("password", state.selectedStudent.password);
			setValue("name", state.selectedStudent.name);
			// setValue("email", state.selectedStudent.email);
			// setValue("address", state.selectedStudent.address);
			// setValue("phone", state.selectedStudent.phone);
		}
	}, [state.selectedStudent, setValue]);
    console.log(state.isRegisterModalOpen)
	return state.isRegisterModalOpen
		? ReactDOM.createPortal(
				<div className="modal">
					<div className="modal__content">
						<header className="header modal__header">
							<h1 className="header__h2">
								{state.selectedStudent ? (
									<>
										Edit <span>Student</span>
									</>
								) : (
									<>
										Add <span>Student</span>
									</>
								)}
							</h1>
							<button
								className="btn btn__compact btn__close"
								onClick={closeModal}
							>
								<CloseSVG />
							</button>
						</header>

						<form
							className="form modal__form"
							onSubmit={handleSubmit(onSubmitHandler)}
							noValidate
						>
							<div className="form__element">
								<label
									htmlFor="userid"
									className={cx("label", errors.name && "label--error")}
								>
								</label>
								<input
									type="text"
									id="userid"
									name="userid"
									placeholder="ID"
									className={cx("input", errors.name && "input--error")}
									ref={register({ required: true })}
								/>
							</div>
							<div className="form__element">
								<label
									htmlFor="password"
									className={cx("label", errors.name && "label--error")}
								>
								</label>
								<input
									type="password"
									id="password"
									name="password"
									placeholder="password"
									className={cx("input", errors.name && "input--error")}
									ref={register({ required: true })}
								/>
							</div>
							<div className="form__element">
								<label
									htmlFor="name"
									className={cx("label", errors.name && "label--error")}
								>
								</label>
								<input
									type="text"
									id="name"
									name="name"
									placeholder="name"
									className={cx("input", errors.name && "input--error")}
									ref={register({ required: true })}
								/>
							</div>

							<div className="form__action">
								<button
									className="btn btn__icon btn__cancel"
									type="button"
									onClick={closeModal}
								>
									<CloseSVG /> Cancel
								</button>
								<button className="btn btn__primary btn__icon" type="submit">
									<CheckSVG /> {state.selectedStudent ? "Update" : "Submit"}
								</button>
							</div>
						</form>
					</div>
				</div>,
				document.body
		  )
		: null;
}
