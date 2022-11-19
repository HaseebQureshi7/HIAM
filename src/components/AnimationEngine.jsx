import { motion } from "framer-motion"

export const FadeUp = ({ children }) => {

    const Animations = {
        initial: {
            opacity: 0,
            y: 100
        },
        animate: {
            opacity: 1,
            y: 0
        },
        exit: {
            opacity: 0,
            y: -100
        },
        transition: {
            duration: '0.35'
        }
    }

    return (
        <motion.div initial={Animations.initial} animate={Animations.animate} exit={Animations.exit} transition={Animations.transition}>
            {children}
        </motion.div>
    )
}



export const Fade = ({ children }) => {

    const Animations = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
        },
        exit: {
            opacity: 0,
        },
        transition: {
            duration: '.5'
        }
    }

    return (
        <motion.div initial={Animations.initial} animate={Animations.animate} exit={Animations.exit} transition={Animations.transition}>
            {children}
        </motion.div>
    )
}


export const PopOut = ({ children }) => {

    const Animations = {
        initial: {
            scale: 0
        },
        animate: {
            scale: 1
        },
        exit: {
            scale: 0
        },
        transition: {
            duration: '.35',
            type: "spring",
            stiffness: 300,
            damping: 8
        }
    }

    return (
        <motion.div initial={Animations.initial} animate={Animations.animate} exit={Animations.exit} transition={Animations.transition}>
            {children}
        </motion.div>
    )
}