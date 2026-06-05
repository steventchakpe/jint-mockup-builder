import { Profile } from '@/components/webparts/profile';
import { profileDefaultConfig } from '@/components/webparts/profile';
import { profileSeed } from '@/config/webpart-seeds';

/** Page démo temporaire — vérification visuelle du webpart Profile. */
export default function ProfileDemoPage() {
  return (
    <main className="w-full max-w-[1204px] mx-auto p-lg flex flex-col gap-2xl bg-[#faf9f8] min-h-screen">
      <Profile config={{ ...profileDefaultConfig, title: 'Mon profil' }} content={profileSeed} />
      <Profile config={{ ...profileDefaultConfig, specificProfile: true, shadow: 'strong', radius: 12 }} content={profileSeed} />
    </main>
  );
}
