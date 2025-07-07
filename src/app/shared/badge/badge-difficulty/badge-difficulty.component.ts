import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-badge-difficulty',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './badge-difficulty.component.html',
    styleUrl: './badge-difficulty.component.css'
})
export class BadgeDifficultyComponent{
    @Input() difficulty: number = 0;
    @Input() isTitleDisplayed: boolean = false;

    getStars(): string[] {
        const stars = [];
        for (let i = 1; i <= 3; i++) {
            stars.push(i <= this.difficulty ? '★' : '☆');
        }
        return stars;
    }

    getTitle(): string {
        switch(this.difficulty) {
            case 1: return "Facil";
            case 2: return "Moyen";
            case 3: return "Difficile";
            default: return "";
        }
    }
}