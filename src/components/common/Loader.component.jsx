import {
  Circles

} from 'react-loader-spinner'
import React from 'react'
export default function Loader() {

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-400 bg-opacity-50 z-50">
      <Circles
        color='red'
      />
    </div>
  );
}
