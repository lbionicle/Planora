'use client';

import { ReactNode } from 'react';
import { useParams } from 'next/navigation';

import EventDetailsPage from '@/widgets/EventDetailsPage/ui/EventDetailsPage';

export default function Page(): ReactNode {
  const { eventId } = useParams<{ eventId: string }>();

  return <EventDetailsPage publicId={eventId} />;
}
