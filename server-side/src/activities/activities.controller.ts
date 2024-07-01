import {
  Controller,
  Get,
  Query,
  Res,
  Headers,
  HttpStatus,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { Response } from 'express';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  getActivities(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
    @Headers('if-none-match') etag: string,
    @Res() res: Response,
  ) {
    const { data, total, hash } = this.activitiesService.getActivities(
      page,
      limit,
      search,
    );

    if (etag === hash) {
      return res.status(HttpStatus.NOT_MODIFIED).send();
    }

    res.set({
      ETag: hash,
      'Cache-Control': 'no-cache',
    });

    return res.status(HttpStatus.OK).json({ data, total });
  }
}
