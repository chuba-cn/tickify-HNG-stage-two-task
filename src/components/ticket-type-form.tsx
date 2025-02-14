"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ticketTypeSchema, type TicketTypeValues } from "@/lib/schema";
import { loadFormData, saveFormData } from "@/lib/storage";
import { cn } from "@/lib/utils";

interface TicketTypeFormProps {
  onNext: () => void;
  resetStep: () => void;
  currentStep: number;
}

const ticketTypes = [
  { id: "REGULAR", label: "REGULAR ACCESS", price: "Free", available: "20/52" },
  { id: "VIP", label: "VIP ACCESS", price: "$150", available: "10/52" },
  { id: "VVIP", label: "VVIP ACCESS", price: "$450", available: "5/52" },
];

export default function TicketTypeForm({
  onNext,
  resetStep,
  currentStep,
}: TicketTypeFormProps) {
  
  const form = useForm<TicketTypeValues>({
    resolver: zodResolver(ticketTypeSchema),
    defaultValues: async () => {
      const savedData = loadFormData();
      if (
        savedData.ticketType &&
        typeof savedData.quantity === "number" &&
        !isNaN(savedData.quantity) &&
        savedData.quantity >= 1 &&
        savedData.quantity <= 5
      ) {
        return {
          ticketType: savedData.ticketType,
          quantity: savedData.quantity,
        };
      }
      return {
        ticketType: "REGULAR",
        quantity: 1,
      };
    },
    mode: "onChange",
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      console.log(value);
      if (value.quantity) {
        saveFormData({
          ...value,
          quantity: Number(value.quantity),
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = (data: TicketTypeValues) => {
    saveFormData(data);
    onNext();
  };

  return (
    <div className="min-h-screen w-full p-4 md:flex md:items-center md:justify-center">
      <div className="w-full max-w-[800px] rounded-[40px] border border-surface-secondary bg-surface p-6 md:p-12">
        <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl md:text-[2rem] font-light font-jeju text-white">
            Ticket Selection
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

        <div className="mt-8 flex flex-col md:p-6 md:border md:border-surface-secondary bg-surface-muted md:rounded-[2rem]">
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl border border-surface-secondary/30" />
            <div className="absolute inset-[1px] rounded-2xl border border-surface-secondary/10" />
            <div className="relative rounded-2xl bg-[radial-gradient(169.40%_89.55%_at_94.76%_6.29%,rgba(0,0,0,0.4)_0%,rgba(255,255,255,0.1)_100%)] p-6 text-center">
              <h2 className="text-6xl font-bold text-white font-roadRage">
                Techember Fest &quot;25
              </h2>
              <p className="mt-4 text-white/80 font-roboto">
                Join us for an unforgettable experience at Abuja!
              </p>
              <p className="text-white/80 font-roboto">Secure your spot now.</p>
              <div className="mt-4 flex items-center justify-center gap-2 text-white/80 font-roboto">
                <MapPin className="h-4 w-4 text-red-500" />
                <span>Wuse, Abuja</span>
                <span className="px-2">||</span>
                <span>March 15, 2025 | 7:00 PM</span>
              </div>
            </div>
          </div>

          <div className="my-8 w-full bg-[#07373F] h-1" />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                <label className="text-base font-roboto text-white">
                  Select Ticket Type:
                </label>
                <FormField
                  control={form.control}
                  name="ticketType"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="grid gap-4 md:grid-cols-3 border border-surface-secondary bg-surface p-4 rounded-3xl">
                          {ticketTypes.map((type) => (
                            <button
                              key={type.id}
                              type="button"
                              onClick={() => field.onChange(type.id)}
                              className={cn(
                                "relative w-full rounded-xl border border-teal p-4 text-left transition-all hover:border-teal/50 focus:border-teal focus:ring-teal focus:ring-offset-surface hover:bg-surface-secondary/60",
                                field.value === type.id
                                  ? "bg-surface-secondary"
                                  : "bg-surface"
                              )}
                            >
                              <div className="absolute inset-[1px] rounded-[10px] border border-surface-secondary/10" />
                              <div className="relative space-y-1 font-roboto">
                                <span className="text-2xl font-semibold text-white">
                                  {type.price}
                                </span>
                                <span className="block text-base font-medium text-white">
                                  {type.label}
                                </span>
                                <span className="block text-sm text-white/60">
                                  {type.available}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage className="text-white/50 mt-2 font-roboto" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <label className="text-base font-roboto text-white">
                  Number of Tickets
                </label>
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(value) => {
                          const parsedValue = Number(value);
                          if (!isNaN(parsedValue) && parsedValue > 0) {
                            field.onChange(parsedValue);
                          }
                        }}
                        value={String(field.value || 1)}
                      >
                        <FormControl>
                          <SelectTrigger className="relative w-full rounded-xl border border-surface-secondary bg-surface text-white h-12">
                            <div className="absolute inset-[1px] rounded-[10px] border border-surface-secondary/10" />
                            <SelectValue
                              className="relative"
                              placeholder="Select quantity"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-surface-secondary border-none">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <SelectItem
                              key={num}
                              value={num.toString()}
                              className="text-white font-roboto bg-transparent !hover:bg-surface-muted"
                            >
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-white/50 mt-2 font-roboto" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                <Button
                  onClick={() => {
                    resetStep();
                  }}
                  type="button"
                  variant="outline"
                  className="w-full font-jeju h-12 border-teal text-teal bg-transparent hover:bg-teal/10 rounded-lg hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  disabled={
                    !form.formState.isValid || form.formState.isSubmitting
                  }
                  type="submit"
                  className="w-full font-jeju h-12 bg-teal text-white hover:bg-teal-hover rounded-lg"
                >
                  Next
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
