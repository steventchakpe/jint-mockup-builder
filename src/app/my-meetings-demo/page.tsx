import { MyMeetings, myMeetingsDefaultConfig } from '@/components/webparts/my-meetings';
import { myMeetingsSeed } from '@/config/webpart-seeds';

/** Page démo temporaire — vérification visuelle du webpart My meetings. */
export default function MyMeetingsDemoPage() {
  return (
    <main className="w-full max-w-[1204px] mx-auto p-lg flex flex-col gap-2xl bg-[#faf9f8] min-h-screen">
      <div className="grid grid-cols-2 gap-xl">
        <MyMeetings config={myMeetingsDefaultConfig} content={myMeetingsSeed} />
        <MyMeetings config={{ ...myMeetingsDefaultConfig, height: 292, radius: 8, shadow: 'light' }} content={myMeetingsSeed} />
      </div>
    </main>
  );
}
