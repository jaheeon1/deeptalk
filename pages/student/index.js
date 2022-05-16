import { Header, Layout, Modal, Pagination, AuthTable, Nav, AuthModal, TeacherModal, LoginModal,
	RegisterModal} from "@/components";

function Landing() {
	return (
		<Layout>
			<Nav />
			<Header />
			<AuthTable />
			<Pagination />
			<Modal />
			<AuthModal />
			<TeacherModal />
			<LoginModal />
			<RegisterModal />
		</Layout>
	);
}

export default Landing;