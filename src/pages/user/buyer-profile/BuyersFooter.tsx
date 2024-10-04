const BuyersFooter = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <div className="flex justify-center space-x-4">
        <a href="/terms" className="hover:underline">
          Terms of Use
        </a>
        <a href="/privacy" className="hover:underline">
          Privacy Policy
        </a>
        <a href="/security" className="hover:underline">
          Security Measures
        </a>
        <a href="/ip-policy" className="hover:underline">
          IP Policy
        </a>
        <a href="/cookie-policy" className="hover:underline">
          Cookie Policy
        </a>
      </div>
      <div className="mt-2">
        Copyright © 2024 Publishers Representatives Limited. All rights
        reserved.
      </div>
    </footer>
  );
};

export default BuyersFooter;
