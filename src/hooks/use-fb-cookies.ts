import { useEffect, useRef } from "react";

function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? match[2] : undefined;
}

function setCookie(name: string, value: string, maxAge = 7776000) {
  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function useFbCookies() {
  const fbcRef = useRef(getCookie("_fbc") || "");
  const fbpRef = useRef(getCookie("_fbp") || "");

  useEffect(() => {
    const now = Date.now();

    // Generate _fbc from fbclid if not already set
    if (!fbcRef.current) {
      const params = new URLSearchParams(window.location.search);
      const fbclid = params.get("fbclid");
      if (fbclid) {
        const fbc = `fb.1.${now}.${fbclid}`;
        setCookie("_fbc", fbc);
        fbcRef.current = fbc;
      }
    }

    // Generate _fbp if not already set
    if (!fbpRef.current) {
      const random = Math.floor(1000000000 + Math.random() * 9000000000);
      const fbp = `fb.1.${now}.${random}`;
      setCookie("_fbp", fbp);
      fbpRef.current = fbp;
    }
  }, []);

  return { fbc: fbcRef.current, fbp: fbpRef.current };
}
