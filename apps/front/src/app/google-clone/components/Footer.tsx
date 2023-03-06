import CountryLookup from './CountryLookup';

const Footer = () => {
  return (
    <footer className="absolute bottom-0 w-full bg-[#f2f2f2] text-sm text-gray-500">
      <div className="border-b px-8 py-3">
        <CountryLookup />
      </div>
      <div className="flex flex-col items-center justify-between space-y-7 px-8 py-3 sm:flex-row sm:space-y-0">
        <ul className="flex items-center space-x-6">
          <li className="link">About</li>
          <li className="link">Advertising</li>
          <li className="link">Business</li>
          <li className="link">How Search works</li>
        </ul>
        <ul className="flex items-center space-x-6">
          <li className="link">Privacy</li>
          <li className="link">Terms</li>
          <li className="link">Settings</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
