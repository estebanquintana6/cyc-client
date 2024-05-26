import React from "react";

const ContactSection = () => {
  return (
    <div className="relative bg-primary-100" id="contacto">
      <div className="absolute inset-x-0 bottom-0">
        <svg
          viewBox="0 0 224 12"
          fill="currentColor"
          className="w-full -mb-1 text-white"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C48.8902582,6.27314026 86.2235915,9.40971039 112,9.40971039 C137.776408,9.40971039 175.109742,6.27314026 224,0 L224,12.0441132 L0,12.0441132 L0,0 Z" />
        </svg>
      </div>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
          <h2 className="mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
            Comunícate con nosotros
          </h2>
          <p className="mb-6 text-base text-indigo-100 md:text-lg">

            Dejanos tus datos y nosotros te contactaremos para ayudarte a darle forma a tu
            <span className="relative inline-block px-2">
              <span className="absolute inset-0 transform -skew-x-12 bg-secondary" />
              <span className="relative text-white">proyecto</span>
            </span>
          </p>
          <form className="flex flex-col items-center w-full mb-4 md:flex-row md:px-16">
            <input
              placeholder="Email"
              required
              type="text"
              className="flex-grow w-full h-12 px-4 mb-3 text-white transition duration-200 border-2 border-transparent rounded appearance-none md:mr-2 md:mb-0 bg-primary-50 focus:border-primary-150 focus:outline-none focus:shadow-outline"
            />
            <a
              href="/"
              className="inline-flex items-center justify-center w-full h-12 px-6 font-semibold tracking-wide text-white transition duration-200 rounded shadow-md md:w-auto bg-primary-150 hover:bg-secondary focus:shadow-outline focus:outline-none"
            >
              Contáctame
            </a>
          </form>
          <p className="max-w-md mb-10 text-xs tracking-wide text-indigo-100 sm:text-sm sm:mx-auto md:mb-16">
            Nos comunicaremos contigo a la brevedad
            <br />
            También puedes mandarnos un correo a <a href="mailto:info@connieyepiz.com">info@connieyepiz.com</a> o llamarnos al +52 (442) 223 1511
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
