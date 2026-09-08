"use client";

export default function BlobBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute left-[-10%] top-[-10%] h-[28rem] w-[28rem] rounded-full bg-accent-pink opacity-30 blur-3xl animate-blob" />
      <div className="absolute right-[-10%] top-[20%] h-[24rem] w-[24rem] rounded-full bg-accent-blue opacity-30 blur-3xl animate-blob [animation-delay:2s]" />
      <div className="absolute bottom-[-15%] left-[20%] h-[26rem] w-[26rem] rounded-full bg-accent-yellow opacity-20 blur-3xl animate-blob [animation-delay:4s]" />
      <div className="absolute bottom-[10%] right-[10%] h-[20rem] w-[20rem] rounded-full bg-accent-purple opacity-20 blur-3xl animate-blob [animation-delay:6s]" />
    </div>
  );
}
