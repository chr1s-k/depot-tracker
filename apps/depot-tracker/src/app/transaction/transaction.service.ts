import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  CreateTransactionDto,
  TransactionId,
  URLS,
} from '@chris-k-software/api-interfaces';
import { Observable } from 'rxjs';
import { TransactionEntity } from '../../../../api/src/transaction/transaction.entity';
import { DeleteResult } from 'typeorm';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  readonly prefix = 'api/';

  create(
    createTransactionDto: CreateTransactionDto
  ): Observable<TransactionEntity> {
    const url = this.prefix + URLS.transactionCreateV1;
    return this.http.post<TransactionEntity>(url, createTransactionDto);
  }

  delete(id: TransactionId): Observable<DeleteResult> {
    const url = this.prefix + URLS.transactionDeleteV1;
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete<DeleteResult>(url, { params });
  }
}
