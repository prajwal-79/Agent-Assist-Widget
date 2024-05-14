import { TestBed } from '@angular/core/testing';

import { MyWebComponentService } from './my-web-component.service';

describe('MyWebComponentService', () => {
  let service: MyWebComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyWebComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
