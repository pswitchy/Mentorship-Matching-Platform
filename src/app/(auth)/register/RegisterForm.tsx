"use client";

import { registerUser } from "@/app/actions/authActions";
import {
  profileSchema,
  registerSchema,
  RegisterSchema,
} from "@/lib/schemas/RegisterSchema";
import { handleFormServerErrors } from "@/lib/util";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
} from "@nextui-org/react";
import React, { useState } from "react";
import {
  FormProvider,
  useForm,
} from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import UserDetailsForm from "./UserDetailsForm";
import ProfileDetailsForm from "./ProfileDetailsForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const stepSchemas = [
  registerSchema,
  profileSchema,
];

export default function RegisterForm() {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema =
    stepSchemas[activeStep];

  const registerFormMethods =
    useForm<RegisterSchema>({
      resolver: zodResolver(
        currentValidationSchema
      ),
      mode: "onTouched",
    });

  const {
    handleSubmit,
    getValues,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = registerFormMethods;

  const router = useRouter();

  const onSubmit = async () => {
    const result = await registerUser(
      getValues()
    );
    if (result.status === "success") {
      router.push("/register/success");
    } else {
      handleFormServerErrors(result, setError);
    }
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <UserDetailsForm />;
      case 1:
        return <ProfileDetailsForm />;
      default:
        return "Unknown step";
    }
  };

  const onBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onNext = async () => {
    if (activeStep === stepSchemas.length - 1) {
      await onSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  return (
    <Card className="w-3/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-default">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">
              Register
            </h1>
          </div>
          <p className="text-neutral-500">
            Welcome to NextMatch
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <FormProvider {...registerFormMethods}>
          <form onSubmit={handleSubmit(onNext)}>
            <div className="space-y-4">
              {getStepContent(activeStep)}
              {errors.root?.serverError && (
                <p className="text-danger text-sm">
                  {
                    errors.root.serverError
                      .message
                  }
                </p>
              )}
              <div className="flex flex-row items-center gap-6">
                {activeStep !== 0 && (
                  <Button
                    onClick={onBack}
                    fullWidth
                  >
                    Back
                  </Button>
                )}
                <Button
                  isLoading={isSubmitting}
                  isDisabled={!isValid}
                  fullWidth
                  color="default"
                  type="submit"
                >
                  {activeStep ===
                  stepSchemas.length - 1
                    ? "Submit"
                    : "Continue"}
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </CardBody>
    </Card>
  );
}
