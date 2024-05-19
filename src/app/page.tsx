import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center">
          Cardiovascular Disease Prediction
        </h1>
        <p className="text-justify py-5">
          We estimate and predict the risk of cardiovascular disease using
          state-of-the-art machine learning techniques. Our platform provides
          personalized insights and recommendations based on an analysis of key
          health variables to help you take proactive steps toward a healthier
          heart. With CDP, early detection and prevention are possible with just
          a few clicks.
        </p>
        <Image
          src="/images/heart.png"
          alt="Heart"
          width={200}
          height={200}
          className="mt-8"
        />
      </div>
      <Link
        href="/predict"
        className="bg-[#eb2a37] hover:bg-[#a81b25] text-white text-md font-normal py-2 px-4 rounded-full"
      >
        Get Started
      </Link>
      <footer className="text-center text-gray-500">
        <p>
          Made with ❤️ by{" "}
          <Link
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Team Akatsuki
          </Link>
        </p>
      </footer>
    </main>
  );
}
