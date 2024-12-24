import { Test, TestingModule } from '@nestjs/testing';
import { AddressVnService } from './address-vn.service';

describe('AddressVnService', () => {
  let service: AddressVnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressVnService],
    }).compile();

    service = module.get<AddressVnService>(AddressVnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
