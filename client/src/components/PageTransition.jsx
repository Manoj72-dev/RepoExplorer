import {motion } from "framer-motion";

export default function PageTransition({children, x = 80}){
    return (
        <motion.div
            initial={{x, opacity: 0}}
            animate={{ x: 0, opacity: 1}}
            exit={{ x: -x, opacity: 0}}
            transition={{duration:0.4, ease: "easeInOut"}}
        >
            {children}
        </motion.div>
    );
}