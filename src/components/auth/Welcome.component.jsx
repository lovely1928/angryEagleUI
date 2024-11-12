import React from "react";

const Welcome = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-black flex flex-col shadow-lg items-center justify-center gap-4">
        <div>
          <img className="w-[200px] mx-auto rounded-full" src="/lovelyPic.jpg" />
        </div>
        <div className="w-[400px] py-2 my-2">
          <h1 className="text-white font-semibold text-3xl">Hi there!</h1>
          <p className="text-white">
            My name is <strong>Lovely</strong> and i'm fullstack developer. Kindly click on
            button to know more about my work. Or you can also signup/signin just for more personalized experience.
          </p>
        </div>
      </div>
      <div className="flex h-screen flex-col m-auto bg-slate-300 w-1/2 justify-center items-center">
        <div className="w-[400px]">
          <h1 className="text-center text-xl font-semibold">Welcome to </h1>
          <h2 className="text-center text-4xl font-bold mb-4">Angry Eagle</h2>
          {children}
          {/* <img
          className="absolute top-4 right-[230px] transform -rotate-[14deg] h-[518px] w-[378px] z-0"
          src="/rightWing.png"
          />
          <img
          className="absolute left-[230px] top-4 transform rotate-[14deg] h-[518px] w-[378px]"
          src="/leftWing.png"
        /> */}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
