import * as z from "zod";

export const ticketTypeSchema = z.object({
  ticketType: z.enum(["REGULAR", "VIP", "VVIP"], {
    required_error: "Please select a ticket type",
  }),
  quantity: z
    .number({
      required_error: "Please select number of tickets",
    })
    .min(1)
    .max(5),
});


export const attendeeDetailsSchema = z.object({
  profileImage: z.string().min(1, "Profile image is required"),
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  specialRequest: z.string().optional(),
});


export const ticketFormSchema = ticketTypeSchema.merge(attendeeDetailsSchema);

export type TicketTypeValues = z.infer<typeof ticketTypeSchema>;
export type AttendeeDetailsValues = z.infer<typeof attendeeDetailsSchema>;
export type TicketFormValues = z.infer<typeof ticketFormSchema>;