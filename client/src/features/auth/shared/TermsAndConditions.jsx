import { Link } from "@lib";

const TermsAndConditions = () => {
  return (
    <div className="fixed bottom-1 w-full flex items-center leading-3 justify-center px-4 sm:px-6 md:px-8 lg:px-10 text-[0.5rem] sm:text-[0.7rem] md:text-[0.6rem] font-[Gilroy] font-light text-[#656565f0] cursor-default">
      <div className="w-full max-w-[70%] sm:max-w-[70%] md:max-w-[45%] lg:max-w-[38%] text-center leading-2.5 sm:leading-3">
        <span>
          <Link
            to="/privacy-policy"
            className="cursor-pointer  hover:underline ease-in-out"
          >
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link
            to="/terms-conditions"
            className="cursor-pointer  hover:underline ease-in-out"
          >
            Terms & Conditions.
          </Link>
        </span>
      </div>
    </div>
  );
};

export default TermsAndConditions;
