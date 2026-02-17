import { useNavigate } from "react-router-dom";
import styles from "./not_found.module.css";
import Button from "../Button/Button";

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className={styles.notFoundWrapper}>
            <div className={styles.center}>
                <Button
                    type="primary"
                    label={"Back to Home"}
                    task={() => navigate("/posts")}
                ></Button>
                    <h4>404 PAGE NOT FOUND</h4>
                <img src="undraw_page-eaten_b2rt.svg" alt="Not Found BRO" />
            </div>
        </div>
    );
}
