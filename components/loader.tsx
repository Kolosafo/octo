function Loader({ label }: { label: string }) {
  return (
    <div className='grid place-content-center h-full gap-12'>
      <div className='loader'></div>
      <h1>{label}</h1>
    </div>
  );
}

export default Loader;
