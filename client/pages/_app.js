import "../styles/globals.css";
import { RequestProvider } from "react-request-hook";
import axios from "axios";
const axiosInstance = axios.create({
	baseURL: "http://localhost:3001/",
});
function MyApp({ Component, pageProps }) {
	return (
		<RequestProvider value={axiosInstance}>
			{" "}
			<Component {...pageProps} />
		</RequestProvider>
	);
}

export default MyApp;
