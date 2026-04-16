import { motion, useTransform } from 'framer-motion';

const FloatingBall = ({ color, size, top, left, delay = 0, scrollYProgress, speed = 0.2 }) => {
  const yParallax = useTransform(scrollYProgress || { current: 0 }, [0, 1], [0, -500 * speed]);
  
  return (
    <motion.div
      style={{
        width: size,
        height: size,
        top: top,
        left: left,
        background: color,
        boxShadow: `0 0 80px ${color}`,
        y: yParallax
      }}
      initial={{ x: 0, opacity: 0 }}
      animate={{ 
        x: [0, 40, -40, 0],
        opacity: 0.2
      }}
      transition={{ 
        x: { duration: 8 + Math.random() * 4, repeat: Infinity, ease: "easeInOut", delay },
        opacity: { duration: 1 }
      }}
      className="absolute pointer-events-none rounded-full blur-[40px] mix-blend-screen"
    />
  );
};

export default FloatingBall;
