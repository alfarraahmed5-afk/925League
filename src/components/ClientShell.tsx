"use client";
import { useState, useEffect } from "react";
import Preloader from "./Preloader";
import Nav from "./Nav";
import Footer from "./Footer";
import Cursor from "./Cursor";
import LenisProvider from "./LenisProvider";
import PageTransition from "./PageTransition";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem("925_preloader_seen");
    if (seen) { setFirstLoad(false); setReady(true); }
  }, []);

  const handlePreloaderDone = () => {
    sessionStorage.setItem("925_preloader_seen", "1");
    setReady(true);
  };

  return (
    <LenisProvider>
      <Cursor />
      {firstLoad && !ready && <Preloader onComplete={handlePreloaderDone} />}
      <div style={{ opacity: ready ? 1 : 0, transition: "opacity 0.3s" }}>
        <Nav />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </div>
    </LenisProvider>
  );
}
