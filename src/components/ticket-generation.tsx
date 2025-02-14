"use client";

import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { clearFormData, loadFormData } from "@/lib/storage";

interface TicketGenerationProps {
  resetStep: () => void;
  currentStep: number;
}

export function TicketGeneration({
  resetStep,
  currentStep,
}: TicketGenerationProps) {
  const ticketData = loadFormData();

  const handleBookAnother = () => {
    clearFormData();
    resetStep();
  };

  return (
    <div className="min-h-screen w-full p-4 md:flex md:items-center md:justify-center rounded-3xl">
      <div className="w-full max-w-[800px] rounded-[40px] border border-surface-secondary bg-surface p-6 md:p-12">
        <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl md:text-[2rem] font-light font-jeju text-white">
            Ready
          </h1>
          <span className="text-base font-roboto text-white/80">
            Step {currentStep}/3
          </span>
        </div>

        <div className="relative mt-4">
          <div className="h-1 rounded-md w-full bg-surface-secondary/30" />
          <div
            className="absolute left-0 top-0 h-1 bg-teal rounded-md"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          />
        </div>

        <div className="mt-8 flex flex-col items-center text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 font-roboto">
            Your Ticket is Booked!
          </h2>
          <p className="text-white/80 text-base md:text-lg font-roboto">
            Check your email for a copy or you can{" "}
            <span className="text-teal font-roboto">download</span>
          </p>

          <div className="relative mt-16 w-full max-w-[400px] mx-auto">

            <div className="relative">
              <Image
                src={"/svg/ticket-svg-frame.svg"}
                alt="Ticket frame"
                width={400}
                height={800}
                className="w-full h-auto"
              />


              <div className="absolute inset-[24px] flex flex-col text-white">
                <div className="p-[0.875rem] h-[80%] border border-teal rounded-3xl">

                  <div className="text-center mb-5">
                    <h3 className="text-4xl font-bold font-roadRage mb-2">
                      Techember Fest &quot;25
                    </h3>
                    <div className="flex items-center justify-center gap-2 text-white/80 text-[0.625rem]">
                      <MapPin className="h-4 w-4 text-red-500" />
                      <span>Wuse, Abuja</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-white/80 mt-1 text-[0.625rem]">
                      <Calendar className="h-4 w-4" />
                      <span>March 15, 2025 | 7:00 PM</span>
                    </div>
                  </div>


                  {ticketData.profileImage && (
                    <div className="relative w-48 h-48 mx-auto mb-6 rounded-2xl overflow-hidden border-4 border-teal glow-effect">
                      <Image
                        src={ticketData.profileImage || "/placeholder.svg"}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}


                  <div className="rounded-xl overflow-hidden bg-surface-secondary/30 backdrop-blur-sm border border-teal/20 px-3">
                    <div className="grid grid-cols-2 divide-x divide-teal/20 pt-3 font-roboto justify-items-start overflow-x-hidden">
                      <div className="p-4 w-full text-left">
                        <p className="text-white/60 text-sm">Enter your name</p>
                        <p className="text-white font-bold mt-1 truncate">
                          {ticketData.fullName}
                        </p>
                      </div>
                      <div className="p-4 w-full text-left">
                        <p className="text-white/60 text-sm">
                          Enter your email *
                        </p>
                        <p className="text-white font-bold mt-1 truncate">
                          {ticketData.email}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 divide-x divide-teal/20 border-t border-teal/20 justify-items-start">
                      <div className="p-4 text-left">
                        <p className="text-white/60 text-sm">Ticket Type:</p>
                        <p className="text-white font-medium font-roboto mt-1"> 
                          {ticketData.ticketType}
                        </p>
                      </div>
                      <div className="p-4 text-left">
                        <p className="text-white/60 text-sm">Ticket for :</p>
                        <p className="text-white font-medium font-roboto mt-1">
                          {ticketData.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 border-t border-teal/20 text-left">
                      <p className="text-white/60 text-sm">Special request?</p>
                      <p className="text-white font-medium font-roboto mt-1">
                        {ticketData.specialRequest || "No special requests"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-8 flex justify-center">
                    <Image
                      src={"/svg/barcode.svg"}
                      alt="Ticket barcode"
                      width={250}
                      height={60}
                      className="w-[200px]"
                    />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-8 w-full max-w-[400px]">
            <Button
              onClick={handleBookAnother}
              variant="outline"
              className="w-full font-jeju h-12 border-teal text-teal bg-transparent hover:bg-teal/10 hover:text-white"
            >
              Book Another Ticket
            </Button>
            <Button className="w-full font-jeju h-12 bg-teal text-white hover:bg-teal-hover">
              Download Ticket
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
