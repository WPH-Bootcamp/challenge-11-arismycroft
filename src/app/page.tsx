import { MusicPlayer } from "@/components/MusicPlayer";

export default function Page() {
  return (
    <main
      className="
        min-h-screen
        w-full
        bg-black
        flex
        items-center
        justify-center
        overflow-hidden
      "
    >
      <MusicPlayer />
    </main>
  );
}