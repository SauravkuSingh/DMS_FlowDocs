
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { userAuthByOtp, validateOtp } from "@/services/user.services";
import Cookies from "js-cookie";

export default function LoginPage() {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length < 10) {
      toast.error("Please enter a valid mobile number !")
      return;
    }
    try {
     
     setOtpLoading(true);
     const res = await userAuthByOtp(mobileNumber);
     if (!res || !res.status) {
      throw new Error("Something went wrong");
    }
     console.log("OTP sent res is : ", res);
     toast.success("OPT send successfully !")
     setOtpSent(true);
     setOtpLoading(false);
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Error during sending OTP !")
      setOtpLoading(false);
    }
  };
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP!");
      return;
    }
    setLoading(true);
    try {
      const res = await validateOtp(mobileNumber, otp);
      if (!res || !res.status) {
        throw new Error("Something went wrong");
      }
      console.log("User phone number with OTP verified:", res);
      toast.success("Successfully OTP verified!");
      const token = res?.data?.token;
      if (token) {
        // set cookie
        Cookies.set("token", token);
        navigate("/");
      } else {
        toast.error("Token not found in response");
        throw new Error("Token not found in response");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      toast.error(error.message || "Error during OTP verification!");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-600 mt-2">
              {otpSent ? "Enter the OTP sent to your mobile" : "Sign in with your mobile number"}
            </p>
          </div>

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="mobile" className="text-sm font-semibold text-gray-700">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">+91</span>
                  </div>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="pl-12 h-12 text-lg border-2 border-gray-200 focus:border-violet-500 rounded-xl"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500">
                  We'll send you a verification code
                </p>
              </div>

              <Button
                type="submit"
                disabled={otpLoading || mobileNumber.length < 10}
                className="w-full h-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {otpLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Sending OTP...</span>
                  </div>
                ) : (
                  "Send OTP"
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="otp" className="text-sm font-semibold text-gray-700">
                  Enter OTP
                </label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="h-12 text-center text-2xl tracking-widest border-2 border-gray-200 focus:border-violet-500 rounded-xl"
                  maxLength={6}
                  required
                />
                <p className="text-xs text-gray-500 text-center">
                  OTP sent to +91 {mobileNumber}
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full h-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    "Verify OTP"
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                  }}
                  className="w-full h-10 text-gray-600 border-gray-300 hover:bg-gray-50 rounded-xl"
                >
                  Change Mobile Number
                </Button>
              </div>
            </form>
          )}
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/auth/signup" className="text-violet-600 hover:text-violet-700 font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
