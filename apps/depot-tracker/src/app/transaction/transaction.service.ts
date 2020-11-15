import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  CreateTransactionDto,
  Fee,
  Note,
  TransactionDto,
  TransactionId,
  UnitCount,
  UnitPrice,
  URLS,
} from '@chris-k-software/api-interfaces';
import { Observable } from 'rxjs';
import { DeleteResult } from 'typeorm';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  readonly prefix = 'api/';

  create(createTransactionDto: CreateTransactionDto): Observable<Transaction> {
    const url = this.prefix + URLS.transactionCreateV1;
    return this.http
      .post<TransactionDto>(url, createTransactionDto)
      .pipe(map((transactionDto) => new Transaction(transactionDto)));
  }

  delete(id: TransactionId): Observable<DeleteResult> {
    const url = this.prefix + URLS.transactionDeleteV1;
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete<DeleteResult>(url, { params });
  }
}

export class Transaction implements TransactionDto {
  created: Date;
  fee: Fee;
  id: TransactionId;
  unitCount: UnitCount;
  unitPrice: UnitPrice;
  note: Note;
  constructor(transactionDto: TransactionDto) {
    this.created = transactionDto.created;
    this.fee = transactionDto.fee;
    this.id = transactionDto.id;
    this.unitCount = transactionDto.unitCount;
    this.unitPrice = transactionDto.unitPrice;
    this.note = transactionDto.note;
  }
}
