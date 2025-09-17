import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { userAuthByOtp, validateOtp } from '@/services/user.services'
import Cookies from 'js-cookie'

export default function LoginPage() {
  const navigate = useNavigate()
  const [mobileNumber, setMobileNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)

  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (!mobileNumber || mobileNumber.length < 10) {
      toast.error('Please enter a valid mobile number !')
      return
    }
    try {
      setOtpLoading(true)
      const res = await userAuthByOtp(mobileNumber)
      if (!res || !res.status) {
        throw new Error('Something went wrong')
      }
      console.log('OTP sent res is : ', res)
      toast.success('OPT send successfully !')
      setOtpSent(true)
      setOtpLoading(false)
    } catch (error) {
      console.error('Error sending OTP:', error)
      toast.error('Error during sending OTP !')
      setOtpLoading(false)
    }
  }
  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP!')
      return
    }
    setLoading(true)
    try {
      const res = await validateOtp(mobileNumber, otp)
      if (!res || !res.status) {
        throw new Error('Something went wrong')
      }
      console.log('User phone number with OTP verified:', res)
      toast.success('Successfully OTP verified!')
      localStorage.setItem('userId', res?.data?.user_id)
      const token = res?.data?.token
      if (token) {
        // set cookie
        Cookies.set('token', token)
        navigate('/')
      } else {
        toast.error('Token not found in response')
        throw new Error('Token not found in response')
      }
    } catch (error) {
      console.error('Error during OTP verification:', error)
      toast.error(error.message || 'Error during OTP verification!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-white/20 bg-white/80 p-8 shadow-2xl backdrop-blur-sm">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
              Welcome Back
            </h1>
            <p className="mt-2 text-gray-600">
              {otpSent
                ? 'Enter the OTP sent to your mobile'
                : 'Sign in with your mobile number'}
            </p>
          </div>

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="mobile"
                  className="text-sm font-semibold text-gray-700"
                >
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-sm text-gray-500">+91</span>
                  </div>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={mobileNumber}
                    onChange={(e) =>
                      setMobileNumber(
                        e.target.value.replace(/\D/g, '').slice(0, 10)
                      )
                    }
                    className="h-12 rounded-xl border-2 border-gray-200 pl-12 text-lg focus:border-violet-500"
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
                className="h-12 w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 font-semibold text-white shadow-lg transition-all duration-200 hover:from-violet-700 hover:to-purple-700 hover:shadow-xl"
              >
                {otpLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Sending OTP...</span>
                  </div>
                ) : (
                  'Send OTP'
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="otp"
                  className="text-sm font-semibold text-gray-700"
                >
                  Enter OTP
                </label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
                  }
                  className="h-12 rounded-xl border-2 border-gray-200 text-center text-2xl tracking-widest focus:border-violet-500"
                  maxLength={6}
                  required
                />
                <p className="text-center text-xs text-gray-500">
                  OTP sent to +91 {mobileNumber}
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="h-12 w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 font-semibold text-white shadow-lg transition-all duration-200 hover:from-violet-700 hover:to-purple-700 hover:shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    'Verify OTP'
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setOtpSent(false)
                    setOtp('')
                  }}
                  className="h-10 w-full rounded-xl border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Change Mobile Number
                </Button>
              </div>
            </form>
          )}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link
                to="/auth/signup"
                className="font-semibold text-violet-600 hover:text-violet-700 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
