import api from "@/api/api";


export const userAuthByOtp = async (mobileNumber) => {
    try {
      const response = await api.post("/generateOTP", {
        mobile_number: mobileNumber,
      });
      return response.data;
    } catch (error) {
      console.error("Error generating OTP:", error);
      throw error.response?.data || error;
    }
  };
  
  // ✅ Validate OTP
  export const validateOtp = async (mobileNumber, otp) => {
    try {
      const response = await api.post("/validateOTP", {
        mobile_number: mobileNumber,
        otp: otp,
      });
      return response.data;
    } catch (error) {
      console.error("Error validating OTP:", error);
      throw error.response?.data || error;
    }
  };