import React from 'react'
import Image from 'next/image';
const LoadingPage = () => {
  return (
    <div className='w-full h-[90vh] flex justify-center items-center gap-2'>
      <Image
      src={"/assets/logo.svg"}
      width={20}
      height={20}
      className='loadingPage'
      />{" "}
      <p>Loading...</p>
    </div>
  )
}

export default LoadingPage;
