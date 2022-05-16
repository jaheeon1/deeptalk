import { Layout, TeacherTable, Pagination, TeacherModal } from "@/components";

function Landing() {
	return (
		<Layout>
			<TeacherTable />
			<Pagination />
            <TeacherModal />
		</Layout>
	);
}

export default Landing;