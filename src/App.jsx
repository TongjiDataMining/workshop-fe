import {Navigate, Route, Routes} from "react-router-dom";
import {Dashboard, Manage} from "@/layouts";

function App() {
    return (
        <Routes>
            <Route path="/dashboard/*" element={<Dashboard/>}/>
            <Route path="/manage/*" element={<Manage/>}/>
            <Route path="*" element={<Navigate to="/dashboard/home" replace/>}/>
        </Routes>
    );
}

export default App;
