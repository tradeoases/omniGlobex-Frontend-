/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRecoilValue } from "recoil";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AxiosResponse, HttpStatusCode, isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiOutlineCheck } from "react-icons/hi2";

import emailSentImg from "@/assets/email-sent.png";
import emailVerifiedImg from "@/assets/email-verified.png";
import { Button } from "@/components/ui/button";
import usePreviousRoute from "@/hooks/use-previous-route";
import {
  emailVerification,
  resendVerificationEmail,
} from "@/service/apis/user-services";
import { EmailStore, IUser, userStore } from "@/store/user-store";
import { MessageText } from "@/data/data";
import { LOGIN_TO_RESEND_EMAIL } from "@/utils/constants/constants";
import { Input } from "@/components/ui/input";

const VerifyEmailPage = () => {
  const [resendBtn, setResendBtn] = useState<boolean>(true);
  const [ok, setOk] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
  const [resendError, setResendError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState<boolean>(false);
  const userData = useRecoilValue<IUser | null>(userStore);
  const [searchParams] = useSearchParams();
  const previousRoute = usePreviousRoute();
  const navigate = useNavigate();
  const [token, setToken] = useState<null | string>();
  const email = useRecoilValue<{ email: string | null; id: string | null }>(
    EmailStore
  );
  const [code, setCode] = useState<string>("");
  useEffect(() => {
    if (verified) {
      let timeoutKey: NodeJS.Timeout | undefined;

      if (!ok) {
        timeoutKey = setTimeout(() => {
          setOk(true);
        }, 4000);
      }

      return () => clearTimeout(timeoutKey);
    }
  }, [verified, ok]);

  useEffect(() => {
    if (userData) {
      navigate(previousRoute as string);
    }

    const token = searchParams.get(`token`);

    if (!token) {
      return;
    }

    setToken(token);
    handleConfirmEmail();
  }, []);

  useEffect(() => {
    let timeoutKey: NodeJS.Timeout | undefined;

    if (errorMessage) {
      timeoutKey = setTimeout(() => {
        setErrorMessage(null);
      }, 4000);
    }

    return () => clearTimeout(timeoutKey);
  }, [errorMessage]);

  useEffect(() => {
    const timeoutKey: NodeJS.Timeout | undefined = setTimeout(() => {
      setResendBtn(true);
    }, 5000);

    return () => clearTimeout(timeoutKey);
  }, []);

  const handleConfirmEmail = async () => {
    let response: AxiosResponse<any, any>;
    try {
      response = await emailVerification({
        token: token as any,
        key: code,
        id: email.id as any,
      });

      if (response.status === HttpStatusCode.Ok) {
        setVerified(true);
        const data = response.data.data;
        localStorage.setItem("token", data.token);
        localStorage.setItem("profile", JSON.stringify(data.user));
        navigate("/create-business");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
      }
    }
  };

  const handleResendVerificationEmail = async () => {
    if (!email) {
      setResendError(LOGIN_TO_RESEND_EMAIL);
      return;
    }

    setLoading(true);
    try {
      const response: AxiosResponse<any, any> = await resendVerificationEmail(
        email.email || ""
      );

      if (response.status === HttpStatusCode.Ok) {
        setLoading(false);
        setResendSuccess(true);

        console.log(response.data.data);

        const timeoutKey: NodeJS.Timeout | undefined = setTimeout(() => {
          setErrorMessage(null);
          setLoading(false);
        }, 3000);

        return () => clearTimeout(timeoutKey);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (isAxiosError(error)) {
        setResendError(error.response?.data.message);
      }
    }
  };

  return (
    <div className="w-10/12 p-8 xl:w-8/12 mx-auto flex items-center flex-col justify-center my-8">
      <div className="flex items-center justify-center space-y-8 flex-col">
        <p className="text-center text-2xl font-semibold">Email Verification</p>

        <div className="w-72 border p-2 rounded-xl h-60">
          <img
            src={verified ? emailVerifiedImg : emailSentImg}
            alt="email-sent"
            className="w-60 h-40 object-cover"
          />
        </div>

        {email.id && (
          <div>
            <Input
              placeholder="Code"
              onChange={(e) => setCode(e.target.value)}
              value={code}
              className="py-4"
            />
            <Button
              onClick={handleConfirmEmail}
              size="sm"
              className="w-full py-4"
            >
              <span>Verify</span>
            </Button>
          </div>
        )}

        {!verified ? (
          <div className="w-full lg:w-1/2 mx-auto space-y-6">
            <p className="text-center text-xs text-gray-400">
              {MessageText.Default}
            </p>

            {resendBtn && (
              <div className="space-y-4 flex items-center justify-center flex-col">
                <p>Didn't you receive the email?</p>
                {resendError && (
                  <>
                    <p className="text-red-500 text-center">{resendError}</p>
                    {errorMessage === LOGIN_TO_RESEND_EMAIL && (
                      <p>
                        go to{" "}
                        <Link to="/login" className="underline">
                          Login
                        </Link>
                      </p>
                    )}
                  </>
                )}
                {resendSuccess && (
                  <p className="text-green-500 text-center">email sent</p>
                )}
                <Button
                  onClick={handleResendVerificationEmail}
                  size="sm"
                  className="w-1/3"
                >
                  {loading ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    <span>Resend email</span>
                  )}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-center">
              {!ok ? (
                <AiOutlineLoading3Quarters className="animate-spin text-4xl" />
              ) : (
                <HiOutlineCheck className="text-4xl text-emerald-600" />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;



