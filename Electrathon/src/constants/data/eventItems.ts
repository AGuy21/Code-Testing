
//Currently hardcoded event items. In the future, these may be fetched from a backend or CMS.
import type { EventItem } from '../types/EventItem';

export const eventItems: EventItem[] = [
    {
        title: 'Cecil Race Two',
        date: 'Sat Jan 17th, 2026',
        time: '7:00 AM - 2:00 PM',
        description: 'Second race at FSCJ Cecil Field.',
        location: '5640 Pow-Mia Memorial Parkway',
    },
    {
        title: 'Cecil Race Three',
        date: 'Sat Apr 11th, 2026',
        time: '7:00 AM - 1:00 PM',
        description: 'Third race at FSCJ Cecil Field.',
        location: '5640 Pow-Mia Memorial Parkway',
    },
    {
        title: 'Cocoa Beach race',
        date: 'Sat Apr 15th, 2026',
        time: '7:00 AM - 2:00 PM',
        description: 'Race at Cocoa.',
        location: '1519 Clearlake Rd',
    },
]