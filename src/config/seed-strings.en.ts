import type { SeedStrings } from './seed-strings.types';

/** Seed texts — English. Structure zipped by index with webpart-seeds.ts. */
export const seedEn: SeedStrings = {
  news: [
    { title: 'Launching our new intranet platform', chapo: 'The communications team introduces the new collaborative workspace rolled out to all employees.', tag: 'Communications' },
    { title: 'Quarterly results: sustained growth', chapo: 'Performance confirms the group’s momentum across all business lines.', tag: 'Finance' },
    { title: 'Cybersecurity training: June session', chapo: 'A new awareness session is open to all employees this month.', tag: 'IT & Security' },
    { title: 'Highlights from our annual offsite', chapo: 'Two days of workshops and discussions that brought teams together around our priorities.', tag: 'Company life' },
  ],
  events: [
    { title: 'Annual general meeting', location: 'Auditorium' },
    { title: 'Compliance & GDPR workshop', location: 'Room Lyon' },
    { title: 'Team afterwork', location: 'Rooftop' },
  ],
  focus: { tag: 'Featured', title: 'Focus title', description: 'Describe the highlighted content here.', button: 'Learn more' },
  separator: 'Separator',
  myApps: ['HR Portal', 'IT Support', 'Expenses', 'Directory', 'Documents', 'Time off'],
  docs: ['Strategic plan 2026', 'Q3 budget forecast', 'Executive committee minutes', 'Remote work policy'],
  myEmails: [
    { subject: 'Internal communication sign-off', preview: 'Hi, could you review the note before it goes out to all teams? Thanks!' },
    { subject: 'Annual reviews — schedule', preview: 'The review schedule is now available. Please confirm your slots by Friday.' },
    { subject: 'Reminder: cybersecurity training', preview: 'The awareness session takes place Thursday at 2pm in room Lyon. Registration required.' },
    { subject: 'Q2 reporting — consolidated figures', preview: 'Please find attached the consolidated report for the second quarter.' },
    { subject: 'Weekly project check-in', preview: 'Minutes from this morning’s check-in and next steps for the rollout.' },
    { subject: 'Annual offsite photos', preview: 'The offsite photos are now on the intranet — feel free to share them.' },
  ],
  myMeetings: [
    'Weekly executive committee',
    'Intranet project check-in',
    'Annual review — communications team',
    'Compliance & GDPR workshop',
    'Annual offsite preparation',
    'Q3 budget review',
  ],
  newshub: [
    'Proud to announce the launch of our new intranet experience! Redesigned navigation, personalized content and unified search for all employees.',
    'Our team will be at the Digital Workplace Paris expo next week. Come meet us at booth B12! #DigitalWorkplace #Intranet',
    'New tutorial: create an internal newsletter in 5 minutes.',
    'Highlights from our annual offsite: two days of workshops and discussions about internal communications.',
    'Thank you to all our customers for their trust: 96% support satisfaction this year! 🎉',
    '5 best practices to engage frontline teams with your mobile intranet: targeted notifications, short content, no-VPN access…',
  ],
  myTasks: [
    { name: 'Important', tasks: [
      { title: 'Finalize the intranet scoping note', checklist: ['Review the governance section', 'Confirm the timeline with IT'] },
      { title: 'Prepare the executive committee deck' },
      { title: 'Send the internal satisfaction survey' },
    ] },
    { name: 'Planned', tasks: [
      { title: 'Book the room for the GDPR workshop' },
      { title: 'Update the team directory' },
    ] },
    { name: 'Assigned to me', tasks: [
      { title: 'Write the article about the offsite', checklist: ['Select the photos'] },
    ] },
  ],
  imageInteractive: {
    alt: 'Office floor plan',
    shapes: [
      { title: 'Collaborative space', paragraph: 'Open space and bookable meeting rooms.' },
      { title: 'Cafeteria', paragraph: 'Open from 8am to 4pm.' },
      { title: 'Visitor reception' },
    ],
  },
  myResume: { dashboardName: 'the intranet' },
  actionButton: 'Submit a request',
  searchResults: {
    verticals: ['All', 'Documents', 'Sites', 'News'],
    labels: { author: 'Author', owner: 'Owner', modified: 'Modified', published: 'Published', tags: 'Tags' },
    items: [
      { name: 'Strategic plan 2026', tags: ['Strategy', 'Executive'] },
      { name: 'Remote work policy', tags: ['HR'] },
      { name: 'Q3 budget forecast', tags: ['Finance'] },
      { name: 'Communications Hub', tags: ['Communications'] },
      { name: 'Executive committee minutes', tags: ['Executive'] },
      { name: 'Launching the new intranet platform', tags: ['Communications'] },
      { name: 'New starter onboarding guide', tags: ['HR', 'Onboarding'] },
      { name: 'Q2 consolidated report', tags: ['Finance'] },
    ],
    facets: { fileType: 'File type', contentType: 'Content type', author: 'Author', contentBuckets: ['Documents', 'Sites', 'News'] },
  },
  personal: {
    listName: 'Tasks',
    p2: {
      tasks: ['Approve the Q2 consolidated report', 'Prepare the Q3 budget review'],
      emails: [
        { subject: 'May accounting close', preview: 'The close is finalized, details are attached.' },
        { subject: 'Budget trade-offs', preview: 'Could you prepare the scenarios for the next committee?' },
      ],
      meeting: 'Q3 budget review',
    },
    p3: {
      tasks: ['Update the rollout schedule'],
      emails: [
        { subject: 'Workshop minutes', preview: 'Here are the minutes from this morning’s workshop with the action items.' },
      ],
      meeting: 'Weekly project check-in',
    },
  },
};
