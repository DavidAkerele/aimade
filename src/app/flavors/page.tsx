"use client";

import React from "react";
import { PipelineContextProvider } from "@/context/PipelineContext";
import { EcosystemFunnel } from "@/components/pipeline/EcosystemFunnel";

export default function AimadeFlavorsPage() {
  return (
    <PipelineContextProvider>
      <EcosystemFunnel />
    </PipelineContextProvider>
  );
}
