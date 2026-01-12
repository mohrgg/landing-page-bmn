'use client';

import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface RevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    className?: string;
}

export const RevealOnScroll = ({ children, width = "100%", delay = 0, className = "" }: RevealProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-75px" });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }} className={className}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.8, delay, ease: [0.25, 0.25, 0.25, 0.75] }} // Customized cubic-bezier for "premium" feel
            >
                {children}
            </motion.div>
        </div>
    );
};
