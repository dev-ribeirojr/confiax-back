import { Test, TestingModule } from '@nestjs/testing';

import {
  CreateRolesHandler,
  GetRoleByIdHandler,
  GetRolesHandler,
  UpdateRoleByIdHandler,
} from 'src/roles/handler';
import { RolesController } from 'src/roles/roles.controller';

describe('RolesController', () => {
  let controller: RolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        CreateRolesHandler,
        GetRoleByIdHandler,
        GetRolesHandler,
        UpdateRoleByIdHandler,
      ],
    }).compile();

    controller = module.get<RolesController>(RolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
