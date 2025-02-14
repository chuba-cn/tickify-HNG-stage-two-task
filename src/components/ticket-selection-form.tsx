"use client";

import { useState, useEffect } from "react";
import TicketTypeForm from "./ticket-type-form";
import { AttendeeDetailsForm } from "./atendee-details-form";
import { TicketGeneration } from "./ticket-generation";
import { loadCurrentStep, saveCurrentStep } from "@/lib/storage";

export default function TicketSelectionForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    saveCurrentStep(nextStep);
  };

  const handlePrevious = () => {
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    saveCurrentStep(prevStep);
  };

  const resetStep = () => {
    setCurrentStep(1);
    saveCurrentStep(1);
  };

  useEffect(() => {
    const savedStep = loadCurrentStep();
    setCurrentStep(savedStep);
  }, []);

  if (currentStep === 3) {
    return <TicketGeneration resetStep={resetStep} currentStep={currentStep} />;
  }

  if (currentStep === 2) {
    return (
      <AttendeeDetailsForm
        onBack={handlePrevious}
        onNext={handleNext}
        currentStep={currentStep}
      />
    );
  }

  return (
    <TicketTypeForm
      onNext={handleNext}
      resetStep={resetStep}
      currentStep={currentStep}
    />
  );
}
