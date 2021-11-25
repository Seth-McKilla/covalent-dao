import Image from "next/image";

export default function BgImage() {
  return (
    <>
      {/* Darken background image */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.50)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -5,
        }}
      />

      <div
        style={{
          position: "fixed",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          zIndex: -10,
        }}
      >
        <Image
          src="/network.jpg"
          alt="network nodes"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
    </>
  );
}
