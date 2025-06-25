

function Footer() {
  return (
    <footer className='bg-gray-900 md:px-36 text-left w-full mt-10'>
      <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30'>
        <div className='flex flex-col md:items-start items-center w-full'>
          <div className='flex gap-3 items-center mt-0'>
            <img className='w-[2rem] h-[2rem] ' src="/favicon.png" alt="logo" />
            <h1 className= 'text-[2rem] text-green-700 font-bold'>NovaLMS</h1>
          </div>
          <p className='mt-6 text-center md:text-left text-xs text-white/80'>Nova LMS empowers learners with expert-led courses, flexible learning, and real-world skills. Learn anytime, anywhere!</p>
        </div>
        <div className='flex flex-col md:items-start items-center w-full'>
          <h2 className='font-semibold text-white mb-5'>Company</h2>
          <ul className='flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2 '>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div className='hidden md:flex flex-col items-start w-full'>
          <h2 className='font-semibold text-white mb-5'>Subscribe to our newsletter</h2>
          <p className='text-sm text-white/80'>The latest news, aticles, and resources, sent your inbox weekly.</p>
          <div className='flex items-center gap-3 pt-4'>
            <input className='border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm' type="email" placeholder='Enter your email' />
            <button className='w-24 h-9 rounded-md text-white bg-green-700'>Subscribe</button>
          </div>
        </div>
      </div>
      <p className='py-4 text-center text-xs md:text-sm text-white/60'>Copyright 2025  © ATAP. All Right Reserved.</p>
    </footer>
  )
}

export default Footer