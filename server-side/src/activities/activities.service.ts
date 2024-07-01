import { Injectable } from '@nestjs/common';
import { ActivityDto } from '../dto/activity.dto';
import { SupplierDto } from '../dto/supplier.dto';
import * as fs from 'fs';
import * as path from 'path';
import { createHash } from 'crypto';

@Injectable()
export class ActivitiesService {
  private activities: ActivityDto[];
  private suppliers: SupplierDto[];

  constructor() {
    const activitiesPath = path.resolve(__dirname, '../data/activities.json');
    const suppliersPath = path.resolve(__dirname, '../data/suppliers.json');

    this.activities = JSON.parse(fs.readFileSync(activitiesPath, 'utf-8'));
    this.suppliers = JSON.parse(fs.readFileSync(suppliersPath, 'utf-8'));
  }

  getActivities(page: number, limit: number, search: string) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    let filteredActivities = this.activities.map((activity) => ({
      ...activity,
      supplier: this.suppliers.find(
        (supplier) => supplier.id === activity.supplierId,
      ),
    }));

    if (search) {
      filteredActivities = filteredActivities.filter((activity) =>
        activity.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    const total = filteredActivities.length;
    const data = filteredActivities.slice(startIndex, endIndex);

    const hash = this.generateHash(data);

    return { data, total, hash };
  }

  private generateHash(data: any): string {
    const hash = createHash('sha256');
    hash.update(JSON.stringify(data));
    return hash.digest('hex');
  }
}
