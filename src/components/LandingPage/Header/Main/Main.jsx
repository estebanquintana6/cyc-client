import React from "react";

const Main = () => {
    return (
        <div className="bg-cover h-screen flex"
        style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url('/img/c_web_slider_connie.jpeg')"
        }}>
            <div className="px-4 xs:py-32 sm:py-16 mx-auto my-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
                    <div className="flex flex-col mb-16 sm:text-center sm:mb-0">
                        <div className="mb-6 mt-auto xs:mx-auto">
                            <img src="/img/logo.png" className="xs:w-64 sm:w-96 animate-spin" alt="company logo" />
                        </div>
                        <div className="max-w-xl mb-auto md:mx-auto text-center lg:max-w-2xl">
                            <h2 className="max-w-lg mb-6 font-sans xs:text-5xl sm:text-6xl font-bold leading-none tracking-tight text-white uppercase md:mx-auto">
                                Connieyepiz
                            </h2>
                            <p className="xs:text-lg sm:text-2xl text-white">
                                Cada experiencia se encuentra conectada a los espacios en que suceden
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;