import { TestBed, inject } from '@angular/core/testing';

import { DbHelper } from './db.service';

describe('DbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DbHelper]
    });
  });

  it('should be created', inject([DbHelper], (service: DbHelper) => {
    expect(service).toBeTruthy();
  }));
});
