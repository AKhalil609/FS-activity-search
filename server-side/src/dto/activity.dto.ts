import { SupplierDto } from './supplier.dto';

export class ActivityDto {
  id: number;
  title: string;
  price: number;
  currency: string;
  rating: number;
  specialOffer: boolean;
  supplierId: number;
}

export class ActivityWithSupplierDto extends ActivityDto {
  supplier: SupplierDto;
}
