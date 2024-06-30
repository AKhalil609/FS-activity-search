import { Test, TestingModule } from '@nestjs/testing';
import { ActivitiesService } from '../activities.service';
import * as fs from 'fs';
import * as path from 'path';

jest.mock('fs');

describe('ActivitiesService', () => {
  let service: ActivitiesService;

  beforeAll(() => {
    const activitiesPath = path.resolve(__dirname, '../../data/activities.json');
    const suppliersPath = path.resolve(__dirname, '../../data/suppliers.json');

    (fs.readFileSync as jest.Mock).mockImplementation((filePath: string) => {
      if (filePath === activitiesPath) {
        return JSON.stringify([
          { id: 1, title: 'Test Activity 1', price: 10, currency: '$', rating: 4.5, specialOffer: false, supplierId: 1 },
          { id: 2, title: 'Test Activity 2', price: 20, currency: '$', rating: 4.7, specialOffer: true, supplierId: 2 },
        ]);
      }
      if (filePath === suppliersPath) {
        return JSON.stringify([
          { id: 1, name: 'Supplier 1', address: 'Address 1', zip: 'Zip 1', city: 'City 1', country: 'Country 1' },
          { id: 2, name: 'Supplier 2', address: 'Address 2', zip: 'Zip 2', city: 'City 2', country: 'Country 2' },
        ]);
      }
    });
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivitiesService],
    }).compile();

    service = module.get<ActivitiesService>(ActivitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all activities with suppliers', () => {
    const { data, total } = service.getActivities(1, 10, '');
    expect(data).toHaveLength(2);
    expect(total).toBe(2);
    expect(data[0]).toHaveProperty('supplier');
    expect(data[0].supplier.name).toBe('Supplier 1');
  });

  it('should search activities by title', () => {
    const { data, total } = service.getActivities(1, 10, 'Test Activity 1');
    expect(data).toHaveLength(1);
    expect(total).toBe(1);
    expect(data[0].title).toBe('Test Activity 1');
  });

  it('should paginate activities', () => {
    const { data, total } = service.getActivities(2, 1, '');
    expect(data).toHaveLength(1);
    expect(total).toBe(2);
    expect(data[0].title).toBe('Test Activity 2');
  });

  it('should generate correct hash', () => {
    const { data, hash } = service.getActivities(1, 10, '');
    const expectedHash = service['generateHash'](data);
    expect(hash).toBe(expectedHash);
  });
});
