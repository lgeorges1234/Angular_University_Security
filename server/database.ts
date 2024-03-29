
import * as _ from 'lodash';
import {USERS, LESSONS} from "./database-data";
import { DbUser } from './db-user';


class InMemoryDatabase {

    userCounter = 0;

    readAllLessons() {
        return _.values(LESSONS);
    }

    createUser(email: string, passwordDigest:string) {
        const usersPerEmail = _.keyBy(_.values(USERS), 'email');
        if(usersPerEmail[email]) {
            const message = "An user alredy exists with email " + email;
            console.error(message);
            throw new Error(message);
        }
        this.userCounter++;
        const id = this.userCounter;
        const user:DbUser = {
            id,
            email,
            passwordDigest
        };

        USERS[id] = user;

        return user;
    };

    findUserByEmail(email:string) :DbUser {
        const users = _.values(USERS);
        return _.find(users, user => user.email == email);
    };
};

export const db = new InMemoryDatabase();