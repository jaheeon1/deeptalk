import { useEffect } from "react";
import ReactDOM from "react-dom";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import cx from "clsx";

import { CheckSVG, CloseSVG } from "@/icons";
import {
	addStudent,
	setStudentModalOpen,
	setSelectedStudent,
	updateStudent,
} from "@/modules";

export function AuthModal() {
	const { register, handleSubmit, errors, reset, setValue } = useForm();

	const state = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const closeModal = () => {
		reset();
		dispatch(setStudentModalOpen(false));
		dispatch(setSelectedStudent(undefined));
	};

	const onSubmitHandler = (data) => {
		if (data) {
			closeModal();
		}
		if (state.selectedStudent) {
			dispatch(
				updateStudent({
					_id: state.selectedStudent._id,
					...data,
				})
			);
		} else {
			dispatch(addStudent(data));
		}
	};

	useEffect(() => {
		if (state.selectedStudent) {
			setValue("userid", state.selectedStudent.userid);
			setValue("password", state.selectedStudent.password);
			setValue("name", state.selectedStudent.name);
			setValue("email", state.selectedStudent.email);
			setValue("address", state.selectedStudent.address);
			setValue("phone", state.selectedStudent.phone);
		}
	}, [state.selectedStudent, setValue]);

	return state.isAuthModalOpen
		? ReactDOM.createPortal(
				<div className="modal">
					<div className="modal__content">
						<header className="header modal__header">
							<h1 className="header__h2">rgrg
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
									htmlFor="naeeemeInput"
									className={cx("label", errors.name && "label--error")}
								>
									{errors.name ? (
										"Full name is required!"
									) : (
										<>
											Full name&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<input
									type="text"
									id="nameInput"
									name="name"
									placeholder="Full name"
									className={cx("input", errors.name && "input--error")}
									ref={register({ required: true })}
								/>
							</div>

							<div className="form__element">
								<label
									htmlFor="emailInput"
									className={cx("label", errors.email && "label--error")}
								>
									{errors.email ? (
										`${errors.email.message}`
									) : (
										<>
											Email&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<input
									type="email"
									id="emailInput"
									name="email"
									placeholder="Email"
									className={cx("input", errors.email && "input--error")}
									ref={register({
										required: "Email is required!",
										pattern: {
											value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
											message: "Invalid email address!",
										},
									})}
								/>
							</div>

							<div className="form__element">
								<label
									htmlFor="addressArea"
									className={cx("label", errors.address && "label--error")}
								>
									{errors.address ? (
										"Address is required!"
									) : (
										<>
											Address&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<textarea
									type="text"
									id="addressArea"
									name="address"
									placeholder="Address"
									className={cx("area", errors.address && "input--error")}
									ref={register({ required: true })}
								/>
							</div>

							<div className="form__element">
								<label
									htmlFor="phoneNumber"
									className={cx("label", errors.phone && "label--error")}
								>
									{errors.phone ? (
										`${errors.phone.message}`
									) : (
										<>
											Phone&nbsp;<span className="label__required">*</span>
										</>
									)}
								</label>
								<input
									type="number"
									id="phoneNumber"
									name="phone"
									placeholder="Phone"
									className={cx("input", errors.phone && "input--error")}
									ref={register({
										required: "Phone is required!",
										minLength: {
											value: 11,
											message: "Minimum of 11 digits",
										},
										maxLength: {
											value: 12,
											message: "Maximum of 12 digits",
										},
									})}
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
