import { Injectable } from '@angular/core';
import { BehaviorSubject, MonoTypeOperatorFunction, Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private isVisibleSubject = new BehaviorSubject<boolean>(false);
  isVisible$ = this.isVisibleSubject.asObservable();

  show(): void {
    this.isVisibleSubject.next(true);
  }

  hide(): void {
    this.isVisibleSubject.next(false);
  }

  showLoaderOp<T>(): MonoTypeOperatorFunction<T> {
    return tap(this.show);
  }

  showLoaderAutoHideOp<T>(): MonoTypeOperatorFunction<T> {
    return <T>(source: Observable<T>) => {
      return source.pipe(this.showLoaderOp(), finalize(this.hide));
    };
  }

  hideLoaderOp<T>(): MonoTypeOperatorFunction<T> {
    return tap(this.hide);
  }
}
