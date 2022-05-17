import Head from "next/head";
import { Header, AuthModal, LoginModal, TeacherModal, RegisterModal, Nav} from "@/components";

export function Layout({ children }) {
	return (
		<main className="layout artboard phone-2" style={{background: "#eee"}}>
            <link href="https://cdn.jsdelivr.net/npm/daisyui@2.15.0/dist/full.css" rel="stylesheet" type="text/css" />
            <script src="https://cdn.tailwindcss.com"></script> 
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
