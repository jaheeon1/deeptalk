import { Layout,TeacherSwipe, MiddleNav, TalkSwipe, TalkModal} from "@/components";

function Landing() {
	return (
		<Layout>
			<TeacherSwipe />
            <MiddleNav />
			<TalkSwipe />
            <TalkModal />
		</Layout>
	);
}

export default Landing;