function Loader({ label }: { label: string }) {
  return (
    <div className='grid place-content-center min-h-screen gap-12'>
      <div className='loader'></div>
      <h1 className=''>{label}</h1>
    </div>
  );
}

export default Loader;
