import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Route } from '@identora/ui';

@Injectable({ providedIn: 'root' })
export class LoggerService {

  private _logger = new BehaviorSubject<Route[]>([]);

  get logger(): Route[] { return this._logger.value; }

  setLogger(logger: Route[]) { this._logger.next(logger); }
}
