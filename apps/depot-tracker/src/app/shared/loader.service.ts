import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isVisibleSubject = new BehaviorSubject<boolean>(false);
  constructor() {}

  show() {}
  hide() {}
}
