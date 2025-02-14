import type { TicketFormValues } from "./schema";

const FORM_DATA_KEY = "ticket_form_data";
const STEP_KEY = "ticket_form_step";

export function saveFormData(data: Partial<TicketFormValues>) {
  const existingData = loadFormData();

  const mergedData = {
    ...existingData,
    ...data,
  };

  localStorage.setItem(FORM_DATA_KEY, JSON.stringify(mergedData));
}

export function loadFormData(): Partial<TicketFormValues> {
  const data = localStorage.getItem(FORM_DATA_KEY);

  if (!data) return {};

  try {
    return JSON.parse(data);
  } catch (error) {
    console.error("Error parsing ticket form data: ", error);
    return {};
  }
}

export function saveCurrentStep(step: number) {
  localStorage.setItem(STEP_KEY, step.toString());
}

export function loadCurrentStep(): number {
  const step = localStorage.getItem(STEP_KEY);
  return step ? parseInt(step, 10) : 1;
}

export function clearFormData() {
  localStorage.removeItem(FORM_DATA_KEY);
  localStorage.removeItem(STEP_KEY);
}

export function getStepData(
  step: "ticketType" | "atendeeDetails"
): Partial<TicketFormValues> {
  const allData = loadFormData();

  if (step === "ticketType") {
    const { ticketType, quantity } = allData;
    return { ticketType, quantity };
  } else {
    const { profileImage, fullName, email, specialRequest } = allData;
    return { profileImage, fullName, email, specialRequest };
  }
}
