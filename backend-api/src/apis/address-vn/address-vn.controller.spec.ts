import { Test, TestingModule } from '@nestjs/testing';
import { AddressVnController } from './address-vn.controller';

describe('AddressVnController', () => {
  let controller: AddressVnController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressVnController],
    }).compile();

    controller = module.get<AddressVnController>(AddressVnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
