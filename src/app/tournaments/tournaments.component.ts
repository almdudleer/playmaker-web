import {Component, OnInit} from '@angular/core';
import {Tournament} from '../../entities/Tournament';
import {TournamentService} from '../../services/entity-data/tournament.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LocalUserService} from '../../services/local-user.service';

@Component({
    selector: 'app-tournaments',
    templateUrl: './tournaments.component.html',
    styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {
    tours: Tournament[];

    constructor(private tourService: TournamentService,
                private userService: LocalUserService) {
    }

    getTours(): Observable<any> {
        return this.tourService.getTours()
            .pipe(tap(tours => {
                    tours = tours.map(t => new Tournament(t));
                    this.tours = tours;
                }
            ));
    }

    async ngOnInit() {
        this.getTours().subscribe();
        await this.userService.getSelectedTournaments();
    }

    search() {

    }

}
