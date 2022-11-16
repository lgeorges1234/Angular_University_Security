import * as argon2 from 'argon2';

import {Request, response, Response} from 'express';
import { db } from './database';
import { DbUser } from './db-user';
import { randomBytes } from './security.utils';
import { sessionStore } from './session-stores';

export function login(req: Request, res: Response) {
    const credentials = req.body;
    const user = db.findUserByEmail(credentials.email);
    if(!user) {
        res.sendStatus(403);
    } else {
        loginAndBuildResponse(credentials, user, response);
    };
}

async function loginAndBuildResponse(credentials:any, user:DbUser, res: Response) {
    try {
        const sessionId = await attemptLogin(credentials, user);
        console.log("Login successful");
        res.cookie("SESSIONID", sessionId, {httpOnly:true, secure:true});
        res.status(200).json({id:user.id, email:user.email});
    } catch (error) {
        console.log("Login failed");
        res.sendStatus(403);
    }

}

async function attemptLogin(credentials: any, user:DbUser) {
    const isPassworValid = await argon2.verify(user.passwordDigest,
                                                credentials.password);
    if(!isPassworValid) {
        throw new Error('Password Invalid');
    } else {
        const sessionId = await randomBytes(32).then(bytes => bytes.toString('hex'));
        console.log("sessionId",sessionId);
        sessionStore.createSession(sessionId, user);
        return sessionId;
    };
}