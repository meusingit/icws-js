import { Component, OnInit, Input } from '@angular/core';
import {MessengerService} from './messenger.service';
import { Session } from './session';
@Component({
    moduleId: module.id,
    selector: 'messenger',
    templateUrl: './messenger.component.html',
    styleUrls: ['./messenger.component.css']
})
export class Messenger implements OnInit {
    @Input()
    session: Session;
    customUrl: string = "";
    customBody = `
    {
        "item1": "value1",
        "item2": "value2"
    }`;
    customMethod: string = "";
    customResponseBody;
    customRespomseBodyString = JSON.stringify(this.customResponseBody, undefined, 4);
    customResponseHeaders = "";

    constructor(private messengerService:MessengerService) { }

    ngOnInit() {
        this.customUrl = this.session.baseUrl + "/" + this.session.sessionId + "/activations/users/abeb_admin";

    }
    sendCustomRequest() {
        console.log("Called Custom Request");
        console.log(this.session);
        console.log(this.customResponseBody);
        this.messengerService
            .customRequest(this.session, this.customMethod, this.customUrl, this.customBody)
            .subscribe(
            resp => this.customRespomseBodyString = JSON.stringify(resp.json(), undefined, 4),
            resp => this.customRespomseBodyString = JSON.stringify(resp.json(), undefined, 4)
            );
    }
}