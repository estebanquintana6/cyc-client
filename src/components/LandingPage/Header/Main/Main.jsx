import React from "react";

const Main = () => {
    return (
        <div className="bg-cover h-screen flex"
        style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url('/img/background.jpg')"
        }}>
            <div className="px-4 xs:py-32 sm:py-16 mx-auto my-auto max-w-full md:px-24 lg:px-0 lg:py-20">
                <div className="flex flex-col mb-16 sm:text-center sm:mb-0 sm:mx-auto">
                    <div className="mb-6 mt-auto xs:mx-auto">
                        <img src="/img/logo.png" className="xs:w-64 sm:w-96 animate-spin" alt="company logo" />
                    </div>
                    <div className="mb-auto md:mx-auto text-center sm:mt-5">
                        <h2 className="mb-6 font-sans xs:text-5xl sm:text-6xl font-bold leading-none tracking-tight text-white uppercase md:mx-auto">
                            Connie Yepiz Consulting
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;