import { Test, TestingModule } from '@nestjs/testing';
import { ReportController } from './reports.controller';

describe('ReportController', () => {
    let controller: ReportController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ReportController],
        }).compile();

        controller = module.get<ReportController>(ReportController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
