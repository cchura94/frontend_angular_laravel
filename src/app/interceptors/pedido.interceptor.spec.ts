import { TestBed } from '@angular/core/testing';

import { PedidoInterceptor } from './pedido.interceptor';

describe('PedidoInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PedidoInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PedidoInterceptor = TestBed.inject(PedidoInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
