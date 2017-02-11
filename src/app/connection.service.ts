import { Observable } from '@angular-cli/ast-tools/node_modules/rxjs/Rx';
import { ConnectionComponent } from './connection.component';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Injectable } from '@angular/core';

import { User } from './user';
import { Server } from './server';

@Injectable()
export class ConnectionService {
    baseUrl = "/icws/connection";
    headers = new Headers({
        "Origin": window.location.hostname,
        "Accept-Language": "en-US"
    })
    options = new RequestOptions({ headers: this.headers });



    constructor(private http: Http) { }

    login(user: User, server: Server): Observable<any> {
        let body = JSON.stringify({
            "__type": "urn:inin.com:connection:icAuthConnectionRequestSettings",
            "applicationName": "Icws-Js",
            "userID": user.username,
            "password": user.password
        });
        return this.http
            .post(this.getLoginUrl(server),body,this.options)
            .map(resp=>resp.json());
    }

    getLoginUrl(server: Server): string {
        let fullUrl = "https://" + server.serverName + "baseUrl";
        console.log(fullUrl);
        return fullUrl;
    }


}