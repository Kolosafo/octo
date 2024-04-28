function Page() {
  return (
    <section className='relative min-h-screen gradient'>
      <div className='sticky top-0 min-h-[30vh] flex items-center justify-center p-5'>
        <h1 className=' text-mainTxt text-2xl lg:text-4xl font-bold text-center'>
          Games
        </h1>
      </div>
      <div className='relative p-6 grid place-content-center bg-mainBg min-h-[70vh]'>
        <h1>Fun learning games</h1>
      </div>
    </section>
  );
}

export default Page;
