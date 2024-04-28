export default function Loading({ loadMsg }: { loadMsg?: string }) {
  return (
    <div className="grid place-content-center min-h-screen gap-12">
      <div className="loader"></div>
      <h1 className="">{loadMsg ? loadMsg : "Loading..."}</h1>
    </div>
  );
}
