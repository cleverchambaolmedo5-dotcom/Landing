"use client";

import { useEffect, useRef } from "react";
import { eventParams, trackEvent } from "@/lib/meta-pixel";

/** Envía ViewContent una vez por visita a la página donde se monta (la ficha de la entrada en /pago). */
export default function TrackViewContent() {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    trackEvent("ViewContent", eventParams.ViewContent);
  }, []);

  return null;
}
