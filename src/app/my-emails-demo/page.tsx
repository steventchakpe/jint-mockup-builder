import { MyEmails, myEmailsDefaultConfig } from '@/components/webparts/my-emails';
import { myEmailsSeed } from '@/config/webpart-seeds';

/** Page démo temporaire — vérification visuelle du webpart My emails. */
export default function MyEmailsDemoPage() {
  return (
    <main className="w-full max-w-[1204px] mx-auto p-lg flex flex-col gap-2xl bg-[#faf9f8] min-h-screen">
      <div className="grid grid-cols-2 gap-xl">
        <MyEmails config={myEmailsDefaultConfig} content={myEmailsSeed} />
        <MyEmails config={{ ...myEmailsDefaultConfig, height: 296, radius: 8, shadow: 'light' }} content={myEmailsSeed} />
      </div>
    </main>
  );
}
