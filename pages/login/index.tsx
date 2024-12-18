/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Card, Heading, Button, Text, Checkbox } from "@radix-ui/themes";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import OtpDialog from "@/shared/components/Dialogs/OtpVerification";

const LoginPage = () => {
  const router = useRouter();
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const initialValues = {
    email: "",
    password: ""
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required")
  });

  const handleLogin = async (
    values: any,
    { setSubmitting, setErrors }: any
  ) => {
    if (verifyEmail) {
      setOtpDialogOpen(true);
      return;
    }

    await attemptSignIn(values, setErrors);
    setSubmitting(false);
  };

  const attemptSignIn = async (values: any, setErrors: any) => {
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false
      });
      if (!result?.ok) {
        setErrors({ email: "Invalid email or password" });
      } else {
        router.replace("/dashboard");
      }
    } catch (error) {
      console.error(error);
      setErrors({ email: "Something went wrong. Please try again later." });
    }
  };

  const handleOtpVerification = async (values: any) => {
    if (otp === "000000") {
      setOtpDialogOpen(false);
      await attemptSignIn(values, () => {});
    } else {
      setOtpError("Invalid OTP. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google");
  };

  const CustomErrorMessage = ({ name }: { name: string }) => (
    <ErrorMessage
      name={name}
      render={(msg) => (
        <Text style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
          {msg}
        </Text>
      )}
    />
  );

  return (
    <Flex
      align="center"
      justify="center"
      style={{ minHeight: "100vh", padding: "40px" }}
    >
      <Card
        size="5"
        variant="surface"
        style={{
          maxWidth: "600px",
          width: "100%",
          padding: "40px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          borderRadius: "16px"
        }}
      >
        <Flex direction="column" gap="6" align="stretch">
          <Heading
            align="center"
            size="5"
            style={{ marginBottom: "20px", color: "#4F46E5" }}
          >
            Login to Your Account
          </Heading>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <Flex direction="column" gap="4">
                  {/* Email Field */}
                  <div>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      style={{
                        width: "100%",
                        padding: "15px",
                        border: "1px solid #D1D5DB",
                        borderRadius: "8px",
                        fontSize: "16px"
                      }}
                    />
                    <CustomErrorMessage name="email" />
                  </div>

                  {/* Password Field */}
                  <div>
                    <Field
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      style={{
                        width: "100%",
                        padding: "15px",
                        border: "1px solid #D1D5DB",
                        borderRadius: "8px",
                        fontSize: "16px"
                      }}
                    />
                    <CustomErrorMessage name="password" />
                  </div>

                  {/* Verify Email Checkbox */}
                  <Flex align="center" gap="2">
                    <Checkbox
                      id="verify-otp-checkbox"
                      checked={verifyEmail}
                      onCheckedChange={(checked) => setVerifyEmail(!!checked)}
                    />
                    <Text style={{ fontSize: "16px" }}>
                      Verify Email with OTP
                    </Text>
                  </Flex>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="solid"
                    disabled={isSubmitting}
                    style={{
                      marginTop: "20px",
                      width: "100%",
                      fontWeight: "bold",
                      fontSize: "16px",
                      padding: "12px",
                      cursor: "pointer"
                    }}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>

                  {/* Google Login Button */}
                  <Button
                    type="button"
                    variant="soft"
                    color="gray"
                    onClick={handleGoogleLogin}
                    style={{
                      marginTop: "15px",
                      width: "100%",
                      fontWeight: "bold",
                      fontSize: "16px",
                      padding: "12px",
                      cursor: "pointer"
                    }}
                  >
                    Sign in with Google
                  </Button>
                </Flex>

                {/* OTP Dialog */}
                <OtpDialog
                  open={otpDialogOpen}
                  onClose={() => setOtpDialogOpen(false)}
                  otp={otp}
                  setOtp={setOtp}
                  otpError={otpError}
                  handleVerify={() => handleOtpVerification(values)}
                />
              </Form>
            )}
          </Formik>
        </Flex>
      </Card>
    </Flex>
  );
};

export default LoginPage;