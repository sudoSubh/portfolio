"use client";

import { useState } from "react";
import Loading from "@/components/loading";
import { ScrollProgress } from "@/components/magicui/scroll-progress";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <Loading onFinish={() => setLoading(false)} />
      ) : (
        <>
      
          <ScrollProgress />
          {children}
        </>
      )}
    </>
  );
}
