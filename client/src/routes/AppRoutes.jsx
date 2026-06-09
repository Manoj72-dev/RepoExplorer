import {Routes, Route, useLocation} from 'react-router-dom';
import {AnimatePresence} from "framer-motion"

import Home from "../pages/Home";
import Profile from "../pages/Profile"

function AppRoutes(){
    const location = useLocation();
    
    return(
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home/>}/>
                <Route path="/profile/:username" element={<Profile/>}/>
            </Routes>
        </AnimatePresence>
    );
}

export default AppRoutes;