"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode, type PointerEvent } from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "a" | "button" | "span" | "div";
  href?: string;
  onClick?: () => void;
  target?: string;
  rel?: string;
};

/**
 * Magnetic — subtly pulls the element toward the cursor while hovering
 * its bounding box. Intended for primary CTAs.
 */
export function Magnetic({
  children,
  className,
  strength = 0.25,
  as = "div",
  ...rest
}: MagneticProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.4 });

  const onMove = (e: PointerEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mx = e.clientX - rect.left - rect.width / 2;
    const my = e.clientY - rect.top - rect.height / 2;
    x.set(mx * strength);
    y.set(my * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Comp = motion[as] as typeof motion.div;

  return (
    <Comp
      ref={ref as never}
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...rest}
    >
      {children}
    </Comp>
  );
}
