import { ClearCookie } from './clear-cookie';
import { Cookie } from './cookie';

export class MiddlewareResponse {
  public _sent: boolean = false;
  public _status: number = 418;
  public _setCookie: Cookie[] = [];
  public _clearCookie: ClearCookie[] = [];
  public _body?: unknown;

  public send(status: number, body?: unknown) {
    this._status = status;
    this._sent = true;
    this._body = body;
    return this;
  }

  public setCookie(cookie: Cookie) {
    this._setCookie.push(cookie);
    return this;
  }

  public clearCookie(cookie: ClearCookie) {
    this._clearCookie.push(cookie);
    return this;
  }
}
