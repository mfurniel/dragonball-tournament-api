import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FightService } from './fight.service';
import { CreateFightDto } from './dto/create-fight.dto';
import { UpdateFightDto } from './dto/update-fight.dto';
import { PaginationRequestDto } from '../common/pagination/dto/pagination-request.dto';
import { FightDto } from './dto/fight.dto';
import { plainToInstance } from 'class-transformer';
import { ApiFormatter } from '../common/api-responses/api-formatter.interceptor';
import { PaginationInterceptor } from '../common/pagination/pagination.interceptor';
import { FeatureFlagGuard } from '../common/features-flags/feature-flag.guard';
import { FeatureFlag } from '../common/features-flags/feature-flag.decorator';

@Controller('fight')
@UseInterceptors(ApiFormatter)
@UseGuards(FeatureFlagGuard)
export class FightController {
  constructor(private readonly fightService: FightService) {}

  @Post()
  @FeatureFlag('FEATURE_FIGHTS_CREATE_FIGHT')
  create(@Body() createFightDto: CreateFightDto) {
    return this.fightService.create(createFightDto);
  }

  @Get()
  @FeatureFlag('FEATURE_FIGHTS_GET_ALL_FIGHTS')
  @UseInterceptors(PaginationInterceptor)
  async findAll(@Query() paginationRequestDto: PaginationRequestDto) {
    const data = await this.fightService.findAll(paginationRequestDto);

    const fights = plainToInstance(FightDto, data, {
      excludeExtraneousValues: true,
    });

    return fights;
  }

  @Get(':id')
  @FeatureFlag('FEATURE_FIGHTS_GET_FIGHT')
  findOne(@Param('id') id: string) {
    return this.fightService.findOne(id);
  }

  @Patch(':id')
  @FeatureFlag('FEATURE_FIGHTS_UPDATE_FIGHT')
  update(@Param('id') id: string, @Body() updateFightDto: UpdateFightDto) {
    return this.fightService.update(id, updateFightDto);
  }

  @Delete(':id')
  @FeatureFlag('FEATURE_FIGHTS_DELETE_FIGHT')
  remove(@Param('id') id: string) {
    return this.fightService.remove(id);
  }
}
