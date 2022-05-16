import Head from "next/head";
import { Header, AuthModal, LoginModal, TeacherModal, RegisterModal, Nav} from "@/components";

export function Layout({ children }) {
	return (
		<main className="layout">
			<Head>
				<title>DeepTalk | AI Consulting APP</title>
			</Head>
            <Header />
            {children}
			<AuthModal />
			<TeacherModal />
			<LoginModal />
			<RegisterModal />
		</main>
	);
}
