import MobileNav from "@/components/MobileNav";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="h-[100vh] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-8xl font-serif tracking-tighter mb-4 text-white">LUMOS</h1>
        <p className="text-white/40 uppercase tracking-widest text-xs">
          High Fidelity Audio & Vision
        </p>
      </section>

      <MobileNav />
    </main>
  );
}