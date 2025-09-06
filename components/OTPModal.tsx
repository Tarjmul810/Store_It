import React, { useState } from "react";
import Image from "next/image";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "./ui/button";
import { verifySecret, sendEmailOTP } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { send } from "process";

const OTPModal = ({ accountId, email }: { accountId: string, email: string }) => {

    const router = useRouter();
    const [isOpen, setIsOpen] = useState(true);
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);

        console.log({ accountId, password });

        try {
            const sessionId = await verifySecret({ accountId, password });
            console.log({ sessionId });
            if (sessionId){ 
                router.push('/')
                console.log("OTP verified successfully");
            }
            else alert('Invalid OTP. Please try again.');
        }
        catch (error) {
            console.error("Error submitting OTP:", error);
        }
        finally {
            setIsLoading(false);
        }
    }

    const handleReset = async () => {
        await sendEmailOTP({ email })
        alert('OTP resent to your email.');
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="shad-alert-dialog">
                <AlertDialogHeader className="relative flex justify-center">
                    <AlertDialogTitle className="h2 text-center">
                        Enter your OTP
                        <Image
                            src="/assets/icons/close-dark.svg"
                            alt="close"
                            width={20}
                            height={20}
                            onClick={() => setIsOpen(false)}
                            className="otp-close-button "
                        />
                    </AlertDialogTitle>
                    <AlertDialogDescription className="subtitle-2 text-center text-light-100">
                        We&apos;ve sent a one-time password (OTP) to your <span className="ml-1 text-brand">{email}</span>. Please enter it below to continue.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <InputOTP maxLength={6} value={password} onChange={setPassword}>
                    <InputOTPGroup className="shad-opt">
                        <InputOTPSlot index={0} className="shad-otp-slot" />
                        <InputOTPSlot index={1} className="shad-otp-slot" />
                        <InputOTPSlot index={2} className="shad-otp-slot" />
                        <InputOTPSlot index={3} className="shad-otp-slot" />
                        <InputOTPSlot index={4} className="shad-otp-slot" />
                        <InputOTPSlot index={5} className="shad-otp-slot" />
                    </InputOTPGroup>
                </InputOTP>

                <AlertDialogFooter>
                    <div className="flex flex-col w-full gap-4">
                        <AlertDialogAction
                            onClick={handleSubmit}
                            className="shad-submit-btn h-12"
                            type="button" >
                            Submit
                            {isLoading && (<Image
                                src="/assets/icons/loader.svg"
                                alt="loader"
                                width={24}
                                height={24}
                                className="ml-2 animate-spin"
                            />
                            )}
                        </AlertDialogAction>

                        <div className="subtitle-2 text-center text-light-100 mt-2">
                            Didn&apos;t receive the OTP?
                            <Button
                                type="button"
                                variant="link"
                                className="pl-2 text-brand"
                                onClick={handleReset}
                            >Click to resend</Button>
                        </div>

                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default OTPModal