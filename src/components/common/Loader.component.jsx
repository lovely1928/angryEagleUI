import {
  Circles

} from 'react-loader-spinner'
import React from 'react'
export default function Loader() {

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <Circles
        color='red'
      />
    </div>
  );
}
