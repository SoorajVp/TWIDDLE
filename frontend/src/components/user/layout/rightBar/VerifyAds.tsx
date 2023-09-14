import { Link } from "react-router-dom"

const VerifyAds = ({ border }) => {
  return (
    <>
          <div className="p-4">
              <div className={`border ${border} max-w-sm mx-8 rounded overflow-hidden shadow-lg`}>
                  <img
                      className="w-full"
                      src="https://www.searchenginejournal.com/wp-content/uploads/2023/03/paid-verification-programs-twitter-blue-meta-verified-641e2764953c9-sej.jpg"
                      alt="Mountain"
                  />
                  <div className="px-6 pt-4 text-center">
                      <div className="font-bold text-base mb-2">Make Verify your Account</div>
                      <p className="text-sm">
                          At Twiddle, we prioritize your online safety. We understand the importance of securing your data and maintaining the trust you've placed in us. Our account verification process is designed to add an extra layer of protection to your account, ensuring that your information remains confidential and accessible only to you. Thank you for partnering with us in creating a secure digital experience.
                      </p>
                  </div>
                  <div className="px-6 py-4">
                      <Link to='/payment'>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-1 rounded-md shadow-md transition duration-300 ease-in"> Verify account now</button>
                      </Link>
                  </div>
              </div>
          </div>
    </>
  )
}

export default VerifyAds