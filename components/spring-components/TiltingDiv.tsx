import { FC, useRef } from "react";
import { useColorStore } from "../GlobalStyles";
import { useSpring, animated } from "react-spring";

const Spring = { xy: [0, 0], config: { mass: 10, tension: 500, friction: 50 } };

const calc = (ref, x: number, y: number) => 
    [-(y-(window.innerHeight / 2)) / 40, (x-(window.innerWidth / 2)) / 40, 1.1]

const rotate = (x,y): string => 
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg)`
    
interface IInteractive { className?: string }

export const TiltingDiv: FC<IInteractive> = ({children, className}) => {
    const [spring, set] = useSpring(() => Spring);
    const ref = useRef();

    return (
        <animated.div
            ref={ref}
            className={className}
            //@ts-ignore
            style={{transform: spring.xy.interpolate(rotate) }}
            onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(ref, x, y) })}
            onMouseLeave={() => set({ xy: [0, 0] })}>
                {children}
        </animated.div>
    )
}

export default TiltingDiv;