import { TestBed } from '@angular/core/testing';

import { PublicPagesService } from './public-pages.service';

describe('PublicPagesService', () => {
  let service: PublicPagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicPagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
