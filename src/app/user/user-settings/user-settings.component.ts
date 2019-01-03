import {Component, OnInit} from '@angular/core';
import {User} from '../../../entities/User';
import {UserService} from '../../../services/entity/user.service';
import {AuthService} from '../../../services/auth.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {ClrLoadingState} from '@clr/angular';

@Component({
    selector: 'app-user-settings',
    templateUrl: './user-settings.component.html',
    styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

    user: User;
    _404 = false;
    loading = false;
    updateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

    constructor(private userService: UserService, private authService: AuthService, private authenticationService: AuthenticationService) {
    }

    async ngOnInit() {
        try {
            this.user = await this.userService.getUser(this.authService.username);
        } catch (error) {
            this.handleError(error);
        }
    }

    handleError(error) {
        switch (error.status) {
            case 404:
                this._404 = true;
                break;
            default:
                throw error;
        }
    }

    connectSteam() {
        this.authenticationService.connectSteam();
    }

    async updateUserInfo() {
        this.updateBtnState = ClrLoadingState.LOADING;
        this.user = await this.userService.updateUser(this.user);
        this.updateBtnState = ClrLoadingState.SUCCESS;
    }
}
