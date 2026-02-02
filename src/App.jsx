import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";

const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <div className="main" >
                    <AppRoutes></AppRoutes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
