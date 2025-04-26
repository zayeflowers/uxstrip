import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';

interface PageTransitionProps {
  children: ReactNode;
}

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -20 }
};

const PageTransition = ({ children }: PageTransitionProps) => {
  const router = useRouter();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={router.asPath}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
