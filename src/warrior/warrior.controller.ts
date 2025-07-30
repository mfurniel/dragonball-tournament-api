import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { WarriorService } from './warrior.service';
import { CreateWarriorDto } from './dto/create-warrior.dto';
import { UpdateWarriorDto } from './dto/update-warrior.dto';
import { PaginationRequestDto } from '../common/pagination/dto/pagination-request.dto';
import { WarriorDto } from './dto/warrior.dto';
import { plainToInstance } from 'class-transformer';
import { ApiFormatter } from '../common/api-responses/api-formatter.interceptor';
import { PaginationInterceptor } from '../common/pagination/pagination.interceptor';
import { FeatureFlagGuard } from '../common/features-flags/feature-flag.guard';
import { FeatureFlag } from '../common/features-flags/feature-flag.decorator';

@Controller('warrior')
export class WarriorController {
  constructor(private readonly warriorService: WarriorService) {}

  @Post()
  create(@Body() createWarriorDto: CreateWarriorDto) {
    return this.warriorService.create(createWarriorDto);
  }

  @Get()
  @FeatureFlag('FEATURE_WARRIORS_GET_ALL_WARRIORS')
  @UseGuards(FeatureFlagGuard)
  @UseInterceptors(ApiFormatter, PaginationInterceptor)
  async findAll(@Query() paginationRequestDto: PaginationRequestDto) {
    const data = await this.warriorService.findAll(paginationRequestDto);

    const warriors = plainToInstance(WarriorDto, data, {
      excludeExtraneousValues: true,
    });

    return warriors;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.warriorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWarriorDto: UpdateWarriorDto) {
    return this.warriorService.update(+id, updateWarriorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.warriorService.remove(+id);
  }
}
