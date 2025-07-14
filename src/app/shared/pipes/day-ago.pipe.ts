import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayAgo',
  standalone: true
})
export class DayAgoPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    const [year, month, day] = value.split('-').map(part => parseInt(part, 10));
    const parsedDate = new Date(year, month - 1, day);

    const now = new Date();
    const seconds = Math.floor((now.getTime() - parsedDate.getTime()) / 1000);

    if (seconds < 60) return `il y a quelques secondes`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;

    const days = Math.floor(hours / 24);
    if (days === 1) return `hier`;
    if (days < 7) return `il y a ${days} jour${days > 1 ? 's' : ''}`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `il y a ${weeks} semaine${weeks > 1 ? 's' : ''}`;

    const months = Math.floor(days / 30);
    if (months < 12) return `il y a ${months} mois`;

    const years = Math.floor(days / 365);
    return `il y a ${years} an${years > 1 ? 's' : ''}`;
  }
}
