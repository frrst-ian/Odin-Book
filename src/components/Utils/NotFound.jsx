import { useNavigate } from "react-router-dom";
import styles from "./not_found.module.css";
import Button from "../Button/Button";

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className={styles.notFoundWrapper}>
            <Button type="primary" label={"Back to Home"} task={() => navigate('/')} ></Button>
           {/* <img
                src="svgs/undraw_page-not-found_6wni.svg"
                alt="Not Found BRO"
            />*/}
        </div>
    );
}