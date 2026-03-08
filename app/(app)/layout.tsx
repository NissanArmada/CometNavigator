<<<<<<< HEAD
import AppNavbar from "./components/AppNavbar";
import { CalendarProvider } from "./CalendarContext";
=======
//This is supposed to delete the Nav bar from the survey page.
import NavbarWrapper from "./components/NavbarWrapper";
>>>>>>> 8fbc3ea94c3c619fd950d44862bfdb9363191b7a

const imgBg = "/assets/e81843a9f0e2b7df5802f930d077cd7023c7d6aa.png";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col isolate relative bg-[#1a1817]">
      {/* Shared background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#1a1817]" />
        <img
          src={imgBg}
          alt=""
          className="absolute w-full h-[125%] top-[-12.5%] left-0 max-w-none object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[rgba(26,24,23,0.8)]" />
      </div>

  <NavbarWrapper />

      <CalendarProvider>
        <main className="flex-1 relative z-10">
          {children}
        </main>
      </CalendarProvider>
    </div>
  );
}
