import {Component, OnInit} from '@angular/core';
import {Tournament} from '../../entities/Tournament';
import {TournamentService} from '../../services/tournament.service';

@Component({
    selector: 'app-tournaments',
    templateUrl: './tournaments.component.html',
    styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit { // TODO: extract tournament card to a separate component
    tours: Tournament[];

    constructor(private tourService: TournamentService) {
    }

    getTours(): void {
        this.tourService.getTours()
            .subscribe(tours => {
              this.tours = tours;
            });
    }

    ngOnInit() {
        this.getTours();
    }

    search() {

    }

}
