"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Heading, Text, Button } from "@radix-ui/themes";

interface OtpDialogProps {
  open: boolean;
  onClose: () => void;
  otp: string;
  setOtp: (otp: string) => void;
  otpError: string;
  handleVerify: () => void;
}

const OtpDialog = ({
  open,
  onClose,
  otp,
  setOtp,
  otpError,
  handleVerify
}: OtpDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Overlay
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          position: "fixed",
          inset: 0
        }}
      />
      <Dialog.Content
        style={{
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          backgroundColor: "white",
          maxWidth: "350px",
          margin: "auto",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center"
        }}
      >
        <Dialog.Title>
          <Heading size="3" style={{ marginBottom: "10px" }}>
            Verify OTP
          </Heading>
        </Dialog.Title>
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          style={{
            marginTop: "10px",
            padding: "10px",
            border: "1px solid #D1D5DB",
            borderRadius: "8px",
            width: "100%",
            fontSize: "14px"
          }}
        />
        {otpError && (
          <Text
            style={{
              color: "red",
              fontSize: "12px",
              marginTop: "5px"
            }}
          >
            {otpError}
          </Text>
        )}
        <Button
          onClick={handleVerify}
          variant="solid"
          style={{
            marginTop: "20px",
            width: "100%",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Verify OTP
        </Button>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default OtpDialog;
