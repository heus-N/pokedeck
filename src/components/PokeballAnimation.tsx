'use client'

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from 'gsap';

// let animationAlreadyPlayed = false;

export default function PokeballAnimation() {
  const [hideBall, setHideBall] = useState(false);
  const imgRef = useRef(null);

  useLayoutEffect(() => {
    // if (animationAlreadyPlayed) return;

    // animationAlreadyPlayed = true;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { rotation: 0, scale: 0, opacity: 0 },
        {
          opacity: 1,
          display: 'block',
          rotation: 360,
          scale: 2,
          duration: 1.5,
          ease: "power2.out",
          onComplete: () => {
            gsap.to(imgRef.current, {
              scale: 50,
              opacity: 0,
              rotation: -180,
              duration: 1.5,
              position: 'absolute',
              display: 'none',
              ease: "power1.inOut",
            });
          },
        }
      );
    });

    setTimeout(() => {
      setHideBall(true);
      document.body.style.overflow = originalOverflow;
    }, 4000);

    return () => {
      ctx.revert();
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (hideBall) return null;

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        ref={imgRef}
        src="/utils/pokeball.svg"
        alt="loading-icon"
        style={{ display: 'none' }}
      />
    </div>
  );
}
