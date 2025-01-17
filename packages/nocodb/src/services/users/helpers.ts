import crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import type User from '../../models/User';
import type { NcConfig } from '../../interface/config';
import type { Response } from 'express';

export function genJwt(user: User, config: NcConfig) {
  return jwt.sign(
    {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      id: user.id,
      roles: user.roles,
      token_version: user.token_version,
      stateCode: user.stateCode,
      mobile: user.mobile,
      avatarUrl: user.avatarUrl,
      nick: user.nick,
      openId: user.openId,
      unionId: user.unionId,
    },
    config.auth.jwt.secret,
    // todo: better typing
    { expiresIn: '10h', ...(config.auth.jwt.options as any) },
  );
}

export function randomTokenString(): string {
  return crypto.randomBytes(40).toString('hex');
}

export function setTokenCookie(res: Response, token): void {
  // create http only cookie with refresh token that expires in 7 days
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };
  res.cookie('refresh_token', token, cookieOptions);
}
