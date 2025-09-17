import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'

export default function SignUp() {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!mobileNumber || mobileNumber.length !== 10) {
      alert('Please enter a valid 10-digit mobile number')
      return
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    if (!agreeToTerms) {
      alert('You must agree to the terms.')
      return
    }

    setLoading(true)

    setTimeout(() => {
      console.log({ username, name, mobileNumber, password, agreeToTerms })
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-white/20 bg-white/80 p-8 shadow-2xl backdrop-blur-sm">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600">
              <svg
                className="h-9 w-9 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm-6 5h4a6 6 0 016 6H4a6 6 0 016-6z"
                />
              </svg>
            </div>
            <h1 className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
              Create Account
            </h1>
            <p className="mt-2 text-gray-600">Join us to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="text-sm font-semibold text-gray-700"
                >
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 rounded-xl border-2 border-gray-200 focus:border-violet-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-gray-700"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 rounded-xl border-2 border-gray-200 focus:border-violet-500"
                  required
                />
              </div>
            </div>

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
                Use a 10-digit mobile number
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-xl border-2 border-gray-200 focus:border-violet-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-semibold text-gray-700"
              >
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12 rounded-xl border-2 border-gray-200 focus:border-violet-500"
                required
              />
              {password && confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-600">Passwords do not match</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{' '}
                <a
                  href="#"
                  className="font-semibold text-violet-600 hover:text-violet-700 hover:underline"
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="#"
                  className="font-semibold text-violet-600 hover:text-violet-700 hover:underline"
                >
                  Privacy Policy
                </a>
              </label>
            </div>

            <Button
              type="submit"
              disabled={
                loading ||
                !agreeToTerms ||
                mobileNumber.length !== 10 ||
                !username ||
                !name
              }
              className="h-12 w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 font-semibold text-white shadow-lg transition-all duration-200 hover:from-violet-700 hover:to-purple-700 hover:shadow-xl"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Creating account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a
                href="/auth/login"
                className="font-semibold text-violet-600 hover:text-violet-700 hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
