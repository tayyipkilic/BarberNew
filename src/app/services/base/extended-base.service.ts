import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { DataResponse } from '../../models/responses';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class ExtendedBaseService<T> extends BaseService<T> {
  getAllDeleted(): Observable<DataResponse<T[]>> {
    return this.httpClient.get<DataResponse<T[]>>(
      environment.getApiUrl(`/${this.path}/get-all-deleted`)
    );
  }

  getAllNotDeleted(): Observable<DataResponse<T[]>> {
    return this.httpClient.get<DataResponse<T[]>>(
      environment.getApiUrl(`/${this.path}/get-all-not-deleted`)
    );
  }

  hardDeleteById(id: number): Observable<Response> {
    return this.httpClient.delete<Response>(
      environment.getApiUrl(`/${this.path}/hard-delete-by-id/` + id)
    );
  }

  restoreById(id: number): Observable<DataResponse<T>> {
    return this.httpClient.get<DataResponse<T>>(
      environment.getApiUrl(`/${this.path}/restore-by-id/` + id)
    );
  }
}
