"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Mail, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { attendeeDetailsSchema, AttendeeDetailsValues, type TicketFormValues } from "@/lib/schema";
import { loadFormData, saveFormData } from "@/lib/storage";
import { UploadDropzone } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";

interface AttendeeDetailsFormProps {
  onBack: () => void;
  onNext: () => void;
  currentStep: number;
}

export function AttendeeDetailsForm({
  onBack,
  onNext,
  currentStep,
}: AttendeeDetailsFormProps) {

  const [ uploadedImage, setUploadedImage ] = useState<string>("");
  
  const form = useForm<AttendeeDetailsValues>({
    resolver: zodResolver(attendeeDetailsSchema),
    defaultValues: {
      profileImage: "",
      fullName: "",
      email: "",
      specialRequest: "",
    },
    mode: "onChange"
  });

  useEffect(() => {
    const savedData = loadFormData();

    if (savedData.profileImage) {
      setUploadedImage(savedData.profileImage);
      form.setValue("profileImage", savedData.profileImage);
    }

    if (savedData.fullName) {
      form.setValue("fullName", savedData.fullName);
    }

    if (savedData.email) {
      form.setValue("email", savedData.email);
    }

    if (savedData.specialRequest) {
      form.setValue("specialRequest", savedData.specialRequest);
    }
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      saveFormData(value as TicketFormValues);
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = (data: AttendeeDetailsValues) => {
    saveFormData(data);
    onNext();
  };

  console.log("form valid state: ", form.formState.isValid);

  return (
    <div className="min-h-screen w-full p-4 md:flex md:items-center md:justify-center">
      <div className="w-full max-w-[800px] rounded-[40px] border border-surface-secondary bg-surface p-6 md:p-12">
        <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl md:text-[2rem] font-light font-jeju text-white">
            Attendee Details
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                <div className="rounded-2xl border border-surface-secondary bg-surface-muted p-6">
                  <label className="text-base font-roboto text-white font-semibold mb-8">
                    Upload Profile Photo
                  </label>
                  <FormField
                    control={form.control}
                    name="profileImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            {uploadedImage ? (
                              <div className="relative aspect-square w-full max-w-[300px] mx-auto overflow-hidden rounded-2xl border border-teal">
                                <Image
                                  src={uploadedImage || "/placeholder.svg"}
                                  alt="Uploaded profile"
                                  fill
                                  className="object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setUploadedImage("");
                                    field.onChange("");
                                  }}
                                  className="absolute right-2 top-2 rounded-full bg-surface-secondary p-1 text-white hover:bg-surface-muted"
                                >
                                  <X className="h-4 w-4" />
                                  <span className="sr-only">Remove image</span>
                                </button>
                              </div>
                            ) : (
                              <div className="relative w-full">
                                <div className="absolute inset-0 bg-surface" />
                                <div className="relative aspect-square w-full max-w-[300px] mx-auto">
                                  <UploadDropzone
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                      if (res?.[0]) {
                                        setUploadedImage(res[0].ufsUrl);
                                        field.onChange(res[0].ufsUrl);
                                        toast.success(
                                          "Image uploaded successfully"
                                        );
                                      }
                                    }}
                                    onUploadError={(error: Error) => {
                                      toast.error(
                                        `Error uploading image: ${error.message}`
                                      );
                                    }}
                                    className={cn(
                                      "ut-label:text-white ut-allowed-content:text-white",
                                      "ut-upload-icon:text-white",
                                      "border-[3px] border-teal rounded-2xl h-[300px]",
                                      "ut-button:bg-teal ut-button:text-white ut-button:cursor-pointer",
                                      "ut-ready:border-solid ut-ready:border-teal ut-ready:border-[3px] ut-ready:rounded-3xl",
                                      "ut-readying:border-solid ut-readying:border-teal ut-readying:border-[3px] ut-readying:rounded-3xl"
                                    )}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage className="text-white/50 mt-2 font-roboto" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="w-full h-1 bg-surface-secondary" />

              <div className="space-y-8">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-3">
                          <label className="text-base font-roboto text-white">
                            Enter your name
                          </label>
                          <Input
                            {...field}
                            className="h-12 rounded-xl border-surface-secondary bg-surface text-white placeholder:text-white/60"
                            placeholder="John Doe"
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-white/50 mt-2 font-roboto" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-3">
                          <label className="text-base font-roboto text-white">
                            Enter your email *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />
                            <Input
                              {...field}
                              className="h-12 rounded-xl border-surface-secondary bg-surface pl-10 text-white placeholder:text-white/60"
                              placeholder="hello@example.com"
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-white/50 mt-2 font-roboto" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specialRequest"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="space-y-3">
                          <label className="text-base font-roboto text-white">
                            Special request?
                          </label>
                          <Textarea
                            {...field}
                            className="min-h-[120px] rounded-xl border-surface-secondary bg-surface text-white placeholder:text-white/60"
                            placeholder="Enter any special requests here..."
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
                <Button
                  onClick={onBack}
                  type="button"
                  variant="outline"
                  className="w-full font-jeju h-12 border-teal text-teal bg-transparent hover:bg-teal/10 hover:text-white"
                >
                  Back
                </Button>
                <Button
                  disabled={!form.formState.isValid}
                  type="submit"
                  className="w-full font-jeju h-12 bg-teal text-white hover:bg-teal-hover"
                >
                  Get My Free Ticket
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
