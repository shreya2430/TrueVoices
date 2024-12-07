import { cn } from "@/lib/utils";
import { useFormContext, useWatch } from "react-hook-form";
import { FormInput } from '../FormInput'
import { FormSwitch } from '../FormSwitch'
import { FormTextarea } from '../FormTextarea'
import { Button } from "../ui/button"
import { useState } from "react"


type TestimonialFormProps = {
  className?: string;
};

export const TestimonialForm = ({ className }: TestimonialFormProps) => {
  const form = useFormContext();
  const [message, setMessage] = useState(""); // Success/Error message state
  const [loading, setLoading] = useState(false); // Loading state

  // Watch the enabled switches
  const nameEnabled = useWatch({ control: form.control, name: "inputs.name_enabled" });
  const emailEnabled = useWatch({ control: form.control, name: "inputs.email_enabled" });
  const companyAndTitleEnabled = useWatch({
    control: form.control,
    name: "inputs.companyAndTitle_enabled",
  });
  const profilePicEnabled = useWatch({ control: form.control, name: "inputs.profilePic_enabled" });
  const addressEnabled = useWatch({ control: form.control, name: "inputs.address_enabled" });

  // Watch required switches
  const nameRequired = useWatch({ control: form.control, name: "inputs.name_required" });
  const emailRequired = useWatch({ control: form.control, name: "inputs.email_required" });
  const companyAndTitleRequired = useWatch({
    control: form.control,
    name: "inputs.companyAndTitle_required",
  });
  const addressRequired = useWatch({ control: form.control, name: "inputs.address_required" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // Reset message
    setLoading(true); // Set loading state

    try {
      const formData = form.getValues(); // Get all form values
      const response = await fetch("http://localhost:3003/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create testimonial");
      }

      setMessage("Testimonial created successfully!");
    } catch (error) {
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("An unknown error occurred");
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col space-y-4", className)}>
      <h2 className="text-xl font-semibold mb-4">Create a Testimonial</h2>

      {/* Testimonial Content */}
      <FormTextarea
        name="content"
        label="Testimonial Content"
        placeholder="Write your testimonial here"
        required
      />

      {/* Input Settings */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Input Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <FormSwitch name={"inputs.name_enabled"} label="Name Enabled" />
          <FormSwitch
            name={"inputs.name_required"}
            label="Name Required"
            disabled={!nameEnabled}
          />
          <FormSwitch name={"inputs.email_enabled"} label="Email Enabled" />
          <FormSwitch
            name={"inputs.email_required"}
            label="Email Required"
            disabled={!emailEnabled}
          />
          <FormSwitch
            name={"inputs.companyAndTitle_enabled"}
            label="Company & Title Enabled"
          />
          <FormSwitch
            name={"inputs.companyAndTitle_required"}
            label="Company & Title Required"
            disabled={!companyAndTitleEnabled}
          />
          <FormSwitch name={"inputs.profilePic_enabled"} label="Profile Picture Enabled" />
          <FormSwitch
            name={"inputs.address_enabled"}
            label="Address Enabled"
          />
          <FormSwitch
            name={"inputs.address_required"}
            label="Address Required"
            disabled={!addressEnabled}
          />
        </div>
      </div>

      {/* Dynamic Fields */}
      {nameEnabled && (
        <FormInput
          name="name"
          label="Name"
          placeholder="Enter your name"
          required={nameRequired}
        />
      )}
      {emailEnabled && (
        <FormInput
          name="email"
          label="Email"
          placeholder="Enter your email"
          required={emailRequired}
        />
      )}
      {companyAndTitleEnabled && (
        <FormInput
          name="companyAndTitle"
          label="Company & Title"
          placeholder="Enter your company and title"
          required={companyAndTitleRequired}
        />
      )}
      {profilePicEnabled && (
        <FormInput
          name="profilePic"
          label="Profile Picture URL"
          placeholder="Enter profile picture URL"
        />
      )}
      {addressEnabled && (
        <FormInput
          name="address"
          label="Address"
          placeholder="Enter your address"
          required={addressRequired}
        />
      )}

      {/* Submit Button */}
      <Button type="submit" className="w-full mt-4" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </Button>

      {/* Display Message */}
      {message && (
        <p
          className={`mt-4 text-sm ${
            message.startsWith("Error") ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};